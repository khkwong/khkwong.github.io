import GrassFloor from "./GrassFloor";
import SkyBackdrop from "./SkyBackdrop";
import { useTheme } from "../hooks/useTheme";
import "./HomeScene.css";

export default function HomeScene() {
  const { theme, toggleTheme } = useTheme();
  const isDay = theme === "light";

  return (
    <>
      <SkyBackdrop />

      {/* Sun and moon sit at opposite ends of a wheel; rotating it 180deg sets
          one below the horizon while the other rises to the same spot. Each is
          its own button so its label rides the arc alongside it. Lives outside
          the aria-hidden sky so the buttons stay exposed to assistive tech.
          Inner pages use CornerCelestial instead — the arc would sweep right
          through where their content lives. */}
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

      <GrassFloor />
    </>
  );
}
