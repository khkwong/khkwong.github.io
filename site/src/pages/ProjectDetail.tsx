import { useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import PageChrome from "../components/PageChrome";
import RibbonLink from "../components/RibbonLink";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <PageChrome title="Not Found" signpost={false}>
        <div className="project-detail">
          <p className="project-detail-meta">
            <RibbonLink to="/projects" label="Projects" />
          </p>
          <p>That project doesn't exist.</p>
        </div>
      </PageChrome>
    );
  }

  return (
    <PageChrome title={project.title} signpost={false}>
      <article className="project-detail">
        <p className="project-detail-meta">
          <RibbonLink to="/projects" label="Projects" />
          <span className="project-detail-category">{project.category}</span>
        </p>

        {project.image && (
          <img src={project.image} alt="" className="project-detail-img" />
        )}

        {project.body.map((block, i) => {
          if (block.type === "p") return <p key={i}>{block.text}</p>;
          if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
          if (block.type === "h3") return <h3 key={i}>{block.text}</h3>;
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        })}

        {project.links.length > 0 && (
          <div className="project-links">
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
