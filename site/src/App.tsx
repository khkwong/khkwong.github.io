import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Resume from "./pages/Resume";
import Games from "./pages/Games";

export default function App() {
  const { pathname } = useLocation();
  // /about is the title screen with a dialog open over it, not a page of its
  // own — it keeps a real URL so it stays linkable and Back closes the dialog.
  const isTitleScreen = pathname === "/" || pathname === "/about";
  // Pages already carrying their own pixel chrome. Resume and Games still use
  // the old nav bar until they get the same treatment.
  const hasPixelChrome = isTitleScreen || pathname.startsWith("/projects");

  return (
    <>
      {/* Home is a title screen — its signpost nav replaces the top bar. */}
      {!hasPixelChrome && <NavBar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>
      {!hasPixelChrome && <Footer />}
    </>
  );
}
