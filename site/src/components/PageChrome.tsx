import type { ReactNode } from "react";
import GrassFloor from "./GrassFloor";
import RibbonLink from "./RibbonLink";
import Signpost from "./Signpost";
import SkyBackdrop from "./SkyBackdrop";
import { useTheme } from "../hooks/useTheme";
import "./PageChrome.css";

/**
 * Shared frame for the inner pages: the same sky the title screen uses, a
 * ribbon link back to it, and the sun/moon theme control.
 *
 * `ground` renders the grass strip along the bottom, with the back link as a
 * signpost planted in it. Turn it off and the page loses its way home, so if
 * you do, put a back link somewhere else first.
 */
export default function PageChrome({
  title,
  ground = true,
  signpost = true,
  actions,
  className,
  children,
}: {
  title: string;
  ground?: boolean;
  /**
   * Whether to plant the Home signpost. Pages one level down turn it off and
   * carry their own back link, so only one back control shows at a time.
   */
  signpost?: boolean;
  /** Page-level control rendered at the end of the banner row, beside the title. */
  actions?: ReactNode;
  /**
   * Extra class on the root, so a page can override `--page-width` — the shared
   * max-width the banner and content columns both line up against.
   */
  className?: string;
  children: ReactNode;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDay = theme === "light";

  const rootClass = ["page-chrome", ground && "has-ground", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <SkyBackdrop />

      {/* Same sprite and corner as the title screen's risen body, so it reads
          as the same object — but pinned rather than swung around a 54vh arc,
          which would sweep straight through the content on a scrolling page. */}
      <button
        type="button"
        className="corner-celestial"
        onClick={toggleTheme}
        aria-label={isDay ? "Switch to night time" : "Switch to day time"}
      >
        <img
          src={isDay ? "/img/pixel/sun.png" : "/img/pixel/moon.webp"}
          alt=""
          className={isDay ? "corner-body home-sun" : "corner-body home-moon"}
        />
      </button>

      <header className="page-banner">
        {/* Narrow-viewport stand-in for the signpost, which the content column
            grows over and hides below ~1440px. Both are rendered and CSS picks
            one, so there's no resize listener and no flash on load — but only
            ever one of them is displayed, so neither duplicates the other in
            the accessibility tree. */}
        {signpost && (
          <div className="page-banner-home">
            <RibbonLink to="/" label="Home" />
          </div>
        )}
        <h1 className="page-banner-title">{title}</h1>
        {actions && <div className="page-banner-actions">{actions}</div>}
      </header>

      {children}

      {/* Planted in the grass at the left edge, the same way the title screen's
          nav is planted along the middle. Rendered only with the ground, since
          without it there's nothing for the post to stand in. */}
      {ground && (
        <>
          {signpost && <Signpost to="/" label="Home" className="page-signpost" />}
          <GrassFloor />
        </>
      )}
    </div>
  );
}
