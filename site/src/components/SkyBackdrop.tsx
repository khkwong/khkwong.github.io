import { useState } from "react";
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

/**
 * The day/night sky and its drifting clouds. Shared by the title screen and
 * the inner pages so the whole site sits in one continuous world.
 */
export default function SkyBackdrop() {
  const [clouds] = useState(makeClouds);

  return (
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
  );
}
