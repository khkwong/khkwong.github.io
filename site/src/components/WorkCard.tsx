import { Link } from "react-router-dom";
import type { WorkItem } from "../data/work";
import "./WorkCard.css";

/**
 * Text-forward sibling of ProjectCard.
 *
 * No thumbnail, because every one of these is an internal tool and there is no
 * screenshot that can be published. That constraint turns out to be useful: two
 * shelves of identical-looking cards would leave a visitor unsure why the site
 * has both pages, whereas a gallery and a dossier explain themselves.
 */
export default function WorkCard({ item }: { item: WorkItem }) {
  return (
    <Link to={`/work/${item.slug}`} className="work-card">
      <span className="work-card-company">{item.company}</span>
      <h3 className="work-card-title">{item.title}</h3>
      <p className="work-card-summary">{item.summary}</p>

      <span className="work-card-foot">
        {item.tech.length > 0 && (
          <span className="work-card-tech">
            {item.tech.map((t) => (
              <span key={t} className="work-card-chip">
                {t}
              </span>
            ))}
          </span>
        )}
        <span className="work-card-dates">{item.dates}</span>
      </span>
    </Link>
  );
}
