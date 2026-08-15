import { useEffect, useId, useRef, type ReactNode } from "react";
import "./PixelModal.css";

type Props = {
  /** Rendered into the ribbon banner and used as the dialog's accessible name. */
  title: string;
  onClose: () => void;
  children: ReactNode;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * A dialog dressed as a pixel-art panel. Opening is animated; closing is not,
 * because the caller unmounts us the moment the route changes and there's no
 * state left to animate out of.
 */
export default function PixelModal({ title, onClose, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Move focus in on open and hand it back on close — otherwise closing drops
  // focus to <body> and keyboard users lose their place on the signpost.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  // The scene behind is fixed-position, but the modal body scrolls, so lock the
  // page to stop scroll chaining out to the document.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      // Cycle Tab within the panel. Queried on every keypress rather than
      // cached, so links added to the content later are picked up for free.
      const panel = panelRef.current;
      const nodes = panel?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!panel || !nodes || nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const titleId = useId();

  return (
    <div className="pixel-modal-root">
      {/* Dims the scene without hiding it — the coins keep flying behind. */}
      <div className="pixel-modal-scrim" onClick={onClose} />

      <div
        className="pixel-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <p className="pixel-modal-banner" id={titleId}>
          {title}
        </p>

        <button
          type="button"
          className="pixel-modal-close"
          onClick={onClose}
          aria-label="Close"
          ref={closeRef}
        />

        <div className="pixel-modal-body">{children}</div>

        <div className="pixel-modal-actions">
          <button type="button" className="pixel-btn" onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
