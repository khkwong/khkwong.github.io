import { useLocation, useNavigate } from "react-router-dom";
import AboutModal from "../components/AboutModal";
import CoinField from "../components/CoinField";
import HomeScene from "../components/HomeScene";
import Signpost from "../components/Signpost";
import "./Home.css";

const navSigns = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/games", label: "Games" },
];

export default function Home() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
          <Signpost key={sign.to} to={sign.to} label={sign.label} />
        ))}
      </nav>

      {/* Driven by the URL rather than local state, so /about stays linkable
          and the browser Back button closes the dialog for free. Closing goes
          to "/" instead of history.back() — a direct visit to /about has no
          previous entry on this site to return to. */}
      {pathname === "/about" && <AboutModal onClose={() => navigate("/")} />}
    </div>
  );
}
