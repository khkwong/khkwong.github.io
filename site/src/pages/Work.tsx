import { Link } from "react-router-dom";
import { employment, featuredWork, workItemsFor } from "../data/work";
import { contact, education, skillGroups } from "../data/profile";
import CardRail from "../components/CardRail";
import PageChrome from "../components/PageChrome";
import WorkCard from "../components/WorkCard";
import "./Work.css";

/* The résumé itself is a download rather than a page: it's tailored per
   application, so a transcribed copy here would be a stale, generic version of
   a document maintained elsewhere. */
const resumeButton = (
  <a href={contact.resumePdf} download="Keith_Kwong_Resume.pdf" className="pixel-btn">
    Download Résumé (PDF)
  </a>
);

export default function Work() {
  return (
    <PageChrome title="Work Experience" className="work-page" actions={resumeButton}>
      <div className="work-layout">
        <div className="work-main">
          {/* Plain facts first — where, what title, how long — so someone who
              only wants a track record gets it in seconds. Each row hides the
              full list of what came out of that job behind a disclosure, so the
              complete record is one click away without crowding the page. */}
          <h2 className="scene-title">Timeline</h2>
          <section className="work-timeline" aria-label="Employment history">
            {employment.map((job) => {
              const built = workItemsFor(job.company);
              return (
                <div key={job.company} className="work-timeline-row">
                  <div className="work-timeline-head">
                    <div className="work-timeline-company">
                      {job.url ? (
                        <a href={job.url} target="_blank" rel="noreferrer">
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                      <span className="work-timeline-location">{job.location}</span>
                    </div>
                    <div className="work-timeline-roles">
                      {job.roles.map((role) => (
                        <div key={role.title + role.dates} className="work-timeline-role">
                          <span>{role.title}</span>
                          <span className="work-timeline-dates">{role.dates}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {built.length > 0 && (
                    /* Native <details> rather than a state-driven panel: it's
                       keyboard-operable and screen-reader-announced for free,
                       and there's nothing here JavaScript would improve. */
                    <details className="work-built">
                      <summary>
                        <span className="work-built-caret" aria-hidden="true" />
                        What I built here ({built.length})
                      </summary>
                      <ul>
                        {built.map((item) => (
                          <li key={item.slug}>
                            <strong>
                              {item.tier === "featured" ? (
                                <Link to={`/work/${item.slug}`}>{item.title}</Link>
                              ) : (
                                item.title
                              )}
                            </strong>
                            <span> — {item.summary}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              );
            })}
          </section>

          <CardRail title="Featured Works" label="Featured works">
            {featuredWork.map((item) => (
              <WorkCard key={item.slug} item={item} />
            ))}
          </CardRail>
        </div>

        {/* Supporting evidence, not headline content — off to the side so it
            doesn't push the actual work below the fold.

            Each panel carries its heading *outside* it, in the same .scene-title
            treatment the left column uses. That's what aligns the two columns:
            both start with a heading of identical height, so the Education panel
            and the timeline panel share a top edge. Moving a heading back inside
            its panel breaks that alignment. */}
        <aside className="work-side">
          <section>
            <h2 className="scene-title">Education</h2>
            <div className="work-panel">
              {education.map((edu) => (
                <div key={edu.school}>
                  <p className="work-edu-school">
                    {edu.url ? (
                      <a href={edu.url} target="_blank" rel="noreferrer">
                        {edu.school}
                      </a>
                    ) : (
                      edu.school
                    )}
                  </p>
                  <p className="work-edu-degree">{edu.degree}</p>
                  <p className="work-edu-meta">
                    {edu.dates} · {edu.location}
                  </p>
                  <p className="work-edu-meta">{edu.honors}</p>
                  {edu.coursework.length > 0 && (
                    <p className="work-edu-coursework">{edu.coursework.join(" · ")}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="scene-title">Skills</h2>
            <div className="work-panel">
              {skillGroups.map((group) => (
                <div key={group.label} className="work-skill-group">
                  <h3>{group.label}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </PageChrome>
  );
}
