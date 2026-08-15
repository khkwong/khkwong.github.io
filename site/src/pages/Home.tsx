import { Link } from "react-router-dom";
import CoinField from "../components/CoinField";
import HomeScene from "../components/HomeScene";
import "./Home.css";

const navSigns = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/games", label: "Games" },
];

export default function Home() {
  return (
    <div className="title-screen">
      <HomeScene />
      <CoinField />

      <header className="title-block">
        <p className="title-kicker">Welcome to</p>
        <h1 className="title-name">Keith Kwong</h1>
        <p className="title-tagline">Software Engineer — Full-Stack, Data &amp; ML</p>
      </header>

      {/* Backdrop for the portrait and signs. Declared before both so it paints
          behind them at the same z-index. */}
      <div className="title-wall" aria-hidden="true" />
      <div className="title-guy" aria-hidden="true" />

      {/* Decorative — the h1 above already announces the name. */}
      <div className="title-portrait" aria-hidden="true">
        <img src="/img/pixel/portrait.png" alt="" />
      </div>

      <nav className="sign-nav" aria-label="Main">
        {navSigns.map((sign) => (
          <Link key={sign.to} to={sign.to} className="sign">
            <span className="sign-board">{sign.label}</span>
            <span className="sign-post" aria-hidden="true" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
