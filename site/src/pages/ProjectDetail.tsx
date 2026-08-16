import { useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import PageChrome from "../components/PageChrome";
import RibbonLink from "../components/RibbonLink";
import RichText from "../components/RichText";
import "../components/DetailPanel.css";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageChrome title="Not Found" signpost={false}>
        <div className="detail-panel">
          <p className="detail-meta">
            <RibbonLink to="/projects" label="Projects" />
          </p>
          <p>That project doesn't exist.</p>
        </div>
      </PageChrome>
    );
  }

  return (
    <PageChrome title={project.title} signpost={false}>
      <article className="detail-panel">
        <p className="detail-meta">
          <RibbonLink to="/projects" label="Projects" />
          <span className="detail-badge">{project.category}</span>
        </p>

        {project.image && <img src={project.image} alt="" className="detail-panel-img" />}

        <RichText blocks={project.body} />

        {project.links.length > 0 && (
          <div className="detail-actions">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="pixel-btn"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </article>
    </PageChrome>
  );
}
