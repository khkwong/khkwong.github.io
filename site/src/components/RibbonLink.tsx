import { Link } from "react-router-dom";
import "./RibbonLink.css";

/** A small ribbon banner used as an in-content link. */
export default function RibbonLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="ribbon-link">
      {/* Own element so the gap comes from flex rather than a literal space —
          Press Start 2P has no ◀, so the glyph falls back to another font and
          its metrics can't be relied on for spacing. */}
      <span className="ribbon-link-arrow" aria-hidden="true">
        ◀
      </span>
      <span>{label}</span>
    </Link>
  );
}
