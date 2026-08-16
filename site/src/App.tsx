import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";

/**
 * Every route now carries its own pixel chrome — the title screen's signposts
 * on "/", PageChrome's banner everywhere else — so there's no shared header or
 * footer to render around them, and nothing here to branch on.
 */
export default function App() {
  return (
    <main>
      <Routes>
        {/* /about is the title screen with a dialog open over it, not a page of
            its own — it keeps a real URL so it stays linkable and Back closes
            the dialog. */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<WorkDetail />} />
        {/* Retired pages. The resume became Work Experience and the résumé
            itself a download; the games list was a stale inventory that the
            rebuild itself now says better. Kept as redirects so existing links
            and bookmarks land somewhere rather than 404. */}
        <Route path="/resume" element={<Navigate to="/work" replace />} />
        <Route path="/games" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
