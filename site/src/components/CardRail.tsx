import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import "./CardRail.css";

/**
 * A horizontally scrolling shelf of cards with paging arrows.
 *
 * Keeps a growing set of cards to a fixed height instead of a growing grid, so
 * the page stays roughly one screen tall as entries are added.
 *
 * The scroll is a real overflow container, not a transform-driven track: touch
 * swipe, trackpad, and shift-scroll all work without any code, and tabbing to a
 * card off-screen scrolls it into view because the browser does that for
 * focused elements. The arrows are an affordance on top of that, not the only
 * way through — which is why there's no keyboard handling here to write.
 */
export default function CardRail({
  title,
  label,
  children,
}: {
  title: string;
  /** Accessible name for the scrolling region. */
  label: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    // The 1px slack absorbs sub-pixel rounding — without it the right arrow
    // can stay enabled forever at the end of the track.
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  // Layout effect, not a plain one: the arrows only render once `sync` has
  // measured overflow, and useEffect runs after paint — so they'd pop in a
  // frame late on every load.
  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    // Catches both viewport resizes and the cards reflowing under them, which
    // changes whether there's anything left to scroll to.
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      observer.disconnect();
    };
  }, [sync]);

  const page = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Just under a full width, so the card at the boundary stays partly visible
    // and the jump reads as movement rather than a scene change.
    el.scrollBy({
      left: direction * el.clientWidth * 0.9,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  // Nothing overflows, so the controls would be dead weight.
  const hasOverflow = canScrollLeft || canScrollRight;

  return (
    <section className="card-rail">
      <div className="card-rail-head">
        <h2 className="scene-title">{title}</h2>
        {hasOverflow && (
          <div className="card-rail-controls">
            <button
              type="button"
              className="card-rail-arrow"
              onClick={() => page(-1)}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <span className="card-rail-caret back" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="card-rail-arrow"
              onClick={() => page(1)}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <span className="card-rail-caret" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div className="card-rail-track" ref={trackRef} role="group" aria-label={label}>
        {children}
      </div>
    </section>
  );
}
