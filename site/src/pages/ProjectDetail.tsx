import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "../data/projects";
import "./ProjectDetail.css";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <div className="page">
        <h1>Project not found</h1>
        <Link to="/projects">Back to projects</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/projects" className="back-link">
        ← All projects
      </Link>
      <img src={project.image} alt={project.title} className="project-detail-img" />
      <span className="project-card-category">{project.category}</span>
      <h1>{project.title}</h1>

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
            <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="button button-secondary">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
