import { contact, education, experience, languages, skills } from "../data/resume";
import "./Resume.css";

export default function Resume() {
  return (
    <div className="page">
      <div className="resume-header">
        <div>
          <h1>Keith Kwong</h1>
          <p>{contact.bio}</p>
          <ul className="contact-list">
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </li>
            <li>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={contact.resumePdf} download="Keith_Kwong_Resume">
                Download PDF
              </a>
            </li>
          </ul>
        </div>
        <img src={contact.headshot} alt="Keith Kwong" className="resume-headshot" />
      </div>

      <div className="resume-grid">
        <div className="resume-main">
          <section>
            <h2>Experience</h2>
            {experience.map((job, i) => (
              <div key={i} className="resume-entry">
                <div className="resume-entry-head">
                  <div>
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noreferrer">
                        <strong>{job.company}</strong>
                      </a>
                    ) : (
                      <strong>{job.company}</strong>
                    )}
                    <div>{job.role}</div>
                  </div>
                  <div className="resume-entry-meta">
                    <div>{job.dates}</div>
                    <div>{job.location}</div>
                  </div>
                </div>
                <ul>
                  {job.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h2>Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="resume-entry">
                <div className="resume-entry-head">
                  <div>
                    {edu.url ? (
                      <a href={edu.url} target="_blank" rel="noreferrer">
                        <strong>{edu.school}</strong>
                      </a>
                    ) : (
                      <strong>{edu.school}</strong>
                    )}
                    <div>{edu.degree}</div>
                  </div>
                  <div className="resume-entry-meta">
                    <div>{edu.dates}</div>
                    <div>{edu.location}</div>
                  </div>
                </div>
                {edu.coursework.length > 0 && (
                  <ul className="coursework-list">
                    {edu.coursework.map((course, j) => (
                      <li key={j}>{course}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        </div>

        <aside className="resume-side">
          <h3>Languages</h3>
          <p>{languages.join(", ")}</p>

          <h3>Skills</h3>
          <ul className="skills-list">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
