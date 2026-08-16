import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import Games from "./pages/Games";

export default function App() {
  const { pathname } = useLocation();
  // /about is the title screen with a dialog open over it, not a page of its
  // own — it keeps a real URL so it stays linkable and Back closes the dialog.
  const isTitleScreen = pathname === "/" || pathname === "/about";
  // Pages already carrying their own pixel chrome. Games still uses the old nav
  // bar until it gets the same treatment.
  const hasPixelChrome =
    isTitleScreen || pathname.startsWith("/projects") || pathname.startsWith("/work");

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
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          {/* The resume page became Work Experience; the résumé itself is now a
              download. Kept so existing links and bookmarks don't 404. */}
          <Route path="/resume" element={<Navigate to="/work" replace />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>
      {!hasPixelChrome && <Footer />}
    </>
  );
}
