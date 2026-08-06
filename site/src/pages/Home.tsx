import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "./Home.css";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <div className="page">
      <section className="hero">
        <h1>Hi, I'm Keith Kwong.</h1>
        <p>
          I'm a software engineer working across the full stack — Python, Django, and React
          day to day, with a background in data science and machine learning.
        </p>
        <div className="hero-actions">
          <Link to="/projects" className="button">
            View Projects
          </Link>
          <Link to="/resume" className="button button-secondary">
            Resume
          </Link>
        </div>
      </section>

      <section>
        <h2>Featured Projects</h2>
        <div className="project-grid">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
