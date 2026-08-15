import { Link } from "react-router-dom";
import "./Signpost.css";

/**
 * A wooden sign planted in the ground. Used for the title screen's nav and for
 * the back link on inner pages, so both share one hover and one set of art.
 */
export default function Signpost({
  to,
  label,
  className,
}: {
  to: string;
  label: string;
  className?: string;
}) {
  return (
    <Link to={to} className={className ? `sign ${className}` : "sign"}>
      <span className="sign-board">{label}</span>
      <span className="sign-post" aria-hidden="true" />
    </Link>
  );
}
