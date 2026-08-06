import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import "./ProjectCard.css";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card">
      <img src={project.image} alt={project.title} className="project-card-img" />
      <div className="project-card-body">
        <span className="project-card-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
    </Link>
  );
}
