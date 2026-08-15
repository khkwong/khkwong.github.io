import { useEffect, useRef, useState } from "react";
import "./CoinField.css";

type CoinPhysics = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  bounces: number;
  spawnedAt: number;
};

const GRAVITY = 1600; // px/s^2
const FLOOR_RATIO = 0.78; // fraction of viewport height coins bounce off of — keep in sync with .grass-floor's height (22vh) in HomeScene.css
const BOUNCE_DAMPING = 0.5;
const FLOOR_BOUNCE_FRICTION = 0.8; // vx multiplier applied each time a coin contacts the floor
const FLOOR_GROUND_FRICTION = 0.05; // fraction of vx retained per second while resting on the floor
const COINS_PER_VOLLEY = 7;
const VOLLEY_SHOT_STAGGER_MS = 70;
const VOLLEY_MIN_DELAY_MS = 5000;
const VOLLEY_MAX_DELAY_MS = 8000;
const MAX_COINS = 30;
const COLLECT_RADIUS = 32;
const COIN_LIFETIME_MS = 10000;
const FLICKER_WINDOW_MS = 3000;
const POP_ANIMATION_MS = 220;
const COIN_HALF_SIZE = 20;
const STORAGE_KEY = "coins-clicked";

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export default function CoinField() {
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [coinIds, setCoinIds] = useState<number[]>([]);
  const [count, setCount] = useState(() => {
    const stored = Number(localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(stored) ? stored : 0;
  });

  const physicsRef = useRef(new Map<number, CoinPhysics>());
  const nodeRefs = useRef(new Map<number, HTMLButtonElement>());
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const poppedRef = useRef(new Set<number>());
  const timeoutsRef = useRef<number[]>([]);
  const nextId = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | undefined>(undefined);

  const resetCount = () => {
    setCount(0);
    localStorage.setItem(STORAGE_KEY, "0");
  };

  const removeCoin = (id: number) => {
    physicsRef.current.delete(id);
    nodeRefs.current.delete(id);
    poppedRef.current.delete(id);
    setCoinIds((current) => current.filter((c) => c !== id));
  };

  const popAndCollect = (id: number) => {
    if (poppedRef.current.has(id) || !physicsRef.current.has(id)) return;
    poppedRef.current.add(id);
    const node = nodeRefs.current.get(id);
    node?.classList.remove("coin-flicker");
    node?.classList.add("coin-pop");
    setCount((current) => {
      const next = current + 1;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
    timeoutsRef.current.push(window.setTimeout(() => removeCoin(id), POP_ANIMATION_MS));
  };

  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const spawnOne = (side: "left" | "right" | "top") => {
      if (physicsRef.current.size >= MAX_COINS) return;
      const id = nextId.current++;
      let x: number;
      let y: number;
      let vx: number;
      let vy: number;
      if (side === "top") {
        x = randRange(0.1, 0.9) * window.innerWidth;
        y = -20;
        vx = randRange(-150, 150);
        vy = randRange(200, 400);
      } else {
        const fromLeft = side === "left";
        x = fromLeft ? -20 : window.innerWidth + 20;
        y = window.innerHeight * randRange(0.2, 0.5);
        const speed = randRange(220, 420);
        vx = fromLeft ? speed : -speed;
        vy = -randRange(650, 950);
      }
      const coin: CoinPhysics = {
        id,
        x,
        y,
        vx,
        vy,
        bounces: 0,
        spawnedAt: performance.now(),
      };
      physicsRef.current.set(id, coin);
      setCoinIds((current) => [...current, id]);
    };

    const fireVolley = () => {
      const sides: ("left" | "right" | "top")[] = ["left", "right", "top"];
      const side = sides[Math.floor(Math.random() * sides.length)];
      for (let i = 0; i < COINS_PER_VOLLEY; i++) {
        timeoutsRef.current.push(
          window.setTimeout(() => spawnOne(side), i * VOLLEY_SHOT_STAGGER_MS)
        );
      }
      timeoutsRef.current.push(
        window.setTimeout(fireVolley, randRange(VOLLEY_MIN_DELAY_MS, VOLLEY_MAX_DELAY_MS))
      );
    };
    timeoutsRef.current.push(window.setTimeout(fireVolley, 400));

    const tick = (time: number) => {
      const last = lastTimeRef.current ?? time;
      const dt = Math.min((time - last) / 1000, 0.05);
      lastTimeRef.current = time;

      const floorY = window.innerHeight * FLOOR_RATIO;
      const mouse = mouseRef.current;
      const toRemove: number[] = [];

      physicsRef.current.forEach((coin) => {
        if (poppedRef.current.has(coin.id)) return;

        coin.vy += GRAVITY * dt;
        coin.x += coin.vx * dt;
        coin.y += coin.vy * dt;

        if (coin.y >= floorY && coin.vy > 0) {
          coin.y = floorY;
          coin.vy = -coin.vy * BOUNCE_DAMPING;
          coin.vx *= FLOOR_BOUNCE_FRICTION;
          coin.bounces += 1;
        }

        if (coin.y >= floorY - 2) {
          coin.vx *= Math.pow(FLOOR_GROUND_FRICTION, dt);
        }

        const dx = coin.x - mouse.x;
        const dy = coin.y - mouse.y;
        if (dx * dx + dy * dy < COLLECT_RADIUS * COLLECT_RADIUS) {
          popAndCollect(coin.id);
          return;
        }

        const age = time - coin.spawnedAt;
        const expired = coin.x < -60 || coin.x > window.innerWidth + 60 || age > COIN_LIFETIME_MS;

        if (expired) {
          toRemove.push(coin.id);
          return;
        }

        const node = nodeRefs.current.get(coin.id);
        if (node) {
          node.style.transform = `translate3d(${coin.x - COIN_HALF_SIZE}px, ${
            coin.y - COIN_HALF_SIZE
          }px, 0)`;
          node.classList.toggle("coin-flicker", age > COIN_LIFETIME_MS - FLICKER_WINDOW_MS);
        }
      });

      if (toRemove.length > 0) {
        toRemove.forEach((id) => {
          physicsRef.current.delete(id);
          nodeRefs.current.delete(id);
        });
        setCoinIds((current) => current.filter((id) => !toRemove.includes(id)));
      }

      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      physicsRef.current.clear();
      nodeRefs.current.clear();
      poppedRef.current.clear();
      lastTimeRef.current = undefined;
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <>
      <div className="coin-field" aria-hidden="true">
        {coinIds.map((id) => {
          const coin = physicsRef.current.get(id);
          return (
            <button
              key={id}
              ref={(node) => {
                if (node) nodeRefs.current.set(id, node);
                else nodeRefs.current.delete(id);
              }}
              type="button"
              className="coin"
              style={
                coin
                  ? {
                      transform: `translate3d(${coin.x - COIN_HALF_SIZE}px, ${
                        coin.y - COIN_HALF_SIZE
                      }px, 0)`,
                    }
                  : undefined
              }
              onPointerDown={() => popAndCollect(id)}
              tabIndex={-1}
            >
              <img src="/img/pixel/coin.png" alt="" className="coin-sprite" />
            </button>
          );
        })}
      </div>

      <div className="coin-hud">
        <div className="coin-counter pixel-panel">
          <img src="/img/pixel/coin.png" alt="" className="coin-counter-icon" />
          <span className="coin-counter-digits">
            {String(count)
              .split("")
              .map((digit, i) => (
                <img key={i} src={`/img/pixel/digits/${digit}.png`} alt={digit} />
              ))}
          </span>
        </div>
        <button type="button" className="coin-reset pixel-panel" onClick={resetCount}>
          Reset
        </button>
      </div>
    </>
  );
}
