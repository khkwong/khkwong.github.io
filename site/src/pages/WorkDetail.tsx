import { useParams } from "react-router-dom";
import { getEmployment, getWorkItemBySlug } from "../data/work";
import { contact } from "../data/profile";
import PageChrome from "../components/PageChrome";
import RibbonLink from "../components/RibbonLink";
import RichText from "../components/RichText";
import "../components/DetailPanel.css";

export default function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getWorkItemBySlug(slug) : undefined;

  if (!item) {
    return (
      <PageChrome title="Not Found" signpost={false}>
        <div className="detail-panel">
          <p className="detail-meta">
            <RibbonLink to="/work" label="Work" />
          </p>
          <p>That entry doesn't exist.</p>
        </div>
      </PageChrome>
    );
  }

  const employer = getEmployment(item.company);

  return (
    <PageChrome title={item.title} signpost={false}>
      <article className="detail-panel">
        <p className="detail-meta">
          <RibbonLink to="/work" label="Work" />
          <span className="detail-badge">
            {item.company} · {item.dates}
          </span>
        </p>

        <RichText blocks={item.body} />

        {/* None of this work is public, so there's nothing to link out to. The
            résumé download takes the slot instead, so the page ends on an
            action rather than trailing off mid-paragraph. */}
        <div className="detail-actions">
          <a href={contact.resumePdf} download="Keith_Kwong_Resume.pdf" className="pixel-btn">
            Download Résumé (PDF)
          </a>
          {employer?.url && (
            <a href={employer.url} target="_blank" rel="noreferrer" className="pixel-btn">
              {item.company}
            </a>
          )}
        </div>
      </article>
    </PageChrome>
  );
}
