import { archivedProjects, featuredProjects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import PageChrome from "../components/PageChrome";
import "./Projects.css";

export default function Projects() {
  return (
    <PageChrome title="Projects">
      <div className="project-stage">
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* The older one-off entries, kept as a record without competing for
            attention with the work above. One line each, straight to source. */}
        <section className="project-archive">
          <h2>Also Built</h2>
          <ul>
            {archivedProjects.map((project) => {
              const source = project.links[0];
              return (
                <li key={project.slug}>
                  <strong>
                    {source ? (
                      <a href={source.url} target="_blank" rel="noreferrer">
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </strong>
                  <span> — {project.summary}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </PageChrome>
  );
}
