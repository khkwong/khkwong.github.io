import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Resume from "./pages/Resume";
import Games from "./pages/Games";

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <>
      {/* Home is a title screen — its signpost nav replaces the top bar. */}
      {!isHome && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>
      {!isHome && <Footer />}
    </>
  );
}
