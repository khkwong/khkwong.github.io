import { useState } from "react";
import { useTheme } from "../hooks/useTheme";
import "./HomeScene.css";

const CLOUD_VARIANTS = [
  { src: "/img/pixel/cloud_tiny.png", width: 36 },
  { src: "/img/pixel/cloud_small.png", width: 54 },
  { src: "/img/pixel/cloud_medium.png", width: 140 },
  { src: "/img/pixel/cloud_large.png", width: 200 },
  { src: "/img/pixel/cloud_xlarge.png", width: 260 },
];
const CLOUD_COUNT = 8;

function randRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeClouds() {
  return Array.from({ length: CLOUD_COUNT }, () => {
    const variant = CLOUD_VARIANTS[Math.floor(Math.random() * CLOUD_VARIANTS.length)];
    const duration = randRange(35, 100);
    return {
      src: variant.src,
      width: variant.width,
      top: `${randRange(4, 35)}%`,
      duration,
      // Negative delay fast-forwards into the animation so clouds start
      // mid-flight at a random point instead of all lining up off-screen.
      delay: `-${randRange(0, duration).toFixed(1)}s`,
    };
  });
}

export default function HomeScene() {
  const [clouds] = useState(makeClouds);
  const { theme, toggleTheme } = useTheme();
  const isDay = theme === "light";

  return (
    <>
      <div className="home-sky" aria-hidden="true">
        <div className="sky-layer sky-day" />
        <div className="sky-layer sky-night" />
        {clouds.map((cloud, i) => (
          <img
            key={i}
            src={cloud.src}
            alt=""
            className="home-cloud"
            style={{
              top: cloud.top,
              width: cloud.width,
              animationDuration: `${cloud.duration}s`,
              animationDelay: cloud.delay,
            }}
          />
        ))}
      </div>

      {/* Sun and moon sit at opposite ends of a wheel; rotating it 180deg sets
          one below the horizon while the other rises to the same spot. Each is
          its own button so its label rides the arc alongside it. Lives outside
          the aria-hidden sky so the buttons stay exposed to assistive tech. */}
      <div className="celestial-wheel">
        <button
          type="button"
          className="celestial-slot slot-sun"
          onClick={toggleTheme}
          aria-hidden={!isDay}
          tabIndex={isDay ? 0 : -1}
          aria-label="Switch to night time"
        >
          <img src="/img/pixel/sun.png" alt="" className="celestial-body home-sun" />
          <span className="celestial-hint">
            Night time
            <span aria-hidden="true"> ▶</span>
          </span>
        </button>
        <button
          type="button"
          className="celestial-slot slot-moon"
          onClick={toggleTheme}
          aria-hidden={isDay}
          tabIndex={isDay ? -1 : 0}
          aria-label="Switch to day time"
        >
          <img src="/img/pixel/moon.webp" alt="" className="celestial-body home-moon" />
          <span className="celestial-hint">
            Day time
            <span aria-hidden="true"> ▶</span>
          </span>
        </button>
      </div>

      <div className="grass-floor" aria-hidden="true">
        <div className="grass-dirt" />
        <div className="grass-top" />
        <p className="grass-copyright">© {new Date().getFullYear()} Keith Kwong</p>
      </div>
    </>
  );
}
