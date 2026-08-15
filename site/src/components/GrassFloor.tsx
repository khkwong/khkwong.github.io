import "./HomeScene.css";

/** The dirt-and-grass strip along the bottom of the viewport. */
export default function GrassFloor() {
  return (
    <div className="grass-floor" aria-hidden="true">
      <div className="grass-dirt" />
      <div className="grass-top" />
      <p className="grass-copyright">© {new Date().getFullYear()} Keith Kwong</p>
    </div>
  );
}
