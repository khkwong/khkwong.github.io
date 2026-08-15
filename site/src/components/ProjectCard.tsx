import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import "./ProjectCard.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <div className="project-card-art">
        {project.image ? (
          <img src={project.image} alt="" className="project-card-img" />
        ) : (
          <div className="project-card-img-placeholder" aria-hidden="true">
            ?
          </div>
        )}
        <span className="project-card-category">{project.category}</span>
      </div>
      <div className="project-card-body">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
    </Link>
  );
}
