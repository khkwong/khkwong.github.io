import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "./Home.css";

export default function Projects() {
  return (
    <div className="page">
      <h1>Projects</h1>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
