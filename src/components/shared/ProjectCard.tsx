import { useState } from "react";
import ScreenshotGallery from "./ScreenshotGallery";
import type { ProjectEvidence } from "./projectTypes";
import "./ProjectCard.css";

export interface ProjectCardProps extends ProjectEvidence {
  title: string;
  category: string;
  notes: string[];
  technologies: string[];
  logo?: string | null;
  domain?: string;
  openScreenshotsRequest?: number;
  status?: string;
  actionLabel?: string;
  onViewProject: () => void;
}

function ProjectMark() {
  return (
    <svg
      aria-hidden="true"
      className="shared-project-card__default-icon"
      fill="none"
      viewBox="0 0 48 48"
    >
      <path
        d="M24 7.5c-4.1-4.5-11.5-1.3-11.5 4.8-5.6.8-7.1 8.4-2.8 11.8-3.8 4.3-.8 11.3 5 11.4 1.1 5.6 8.1 7.3 11.3 2.7V10.5A5.8 5.8 0 0 0 24 7.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
      />
      <path
        d="M24 7.5c4.1-4.5 11.5-1.3 11.5 4.8 5.6.8 7.1 8.4 2.8 11.8 3.8 4.3.8 11.3-5 11.4-1.1 5.6-8.1 7.3-11.3 2.7V10.5A5.8 5.8 0 0 1 24 7.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.5"
      />
      <path
        d="M15 15.5c2 0 3 1.3 3 3m15-3c-2 0-3 1.3-3 3M11 27h4m18 0h4m-21 7c2 0 3.2-1 3.7-2.8M33 34c-2 0-3.2-1-3.7-2.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export default function ProjectCard({
  title,
  category,
  notes,
  technologies,
  logo,
  domain,
  openScreenshotsRequest = 0,
  screenshots,
  role,
  impact,
  challenge,
  caseStudyUrl,
  status = "In Progress",
  actionLabel = "View Live Project",
  onViewProject,
}: ProjectCardProps) {
  const [logoLoadFailed, setLogoLoadFailed] = useState(false);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const projectNotes = [notes, [role, impact, challenge]]
    .flat()
    .filter((note): note is string => Boolean(note?.trim()));

  return (
    <article className="shared-project-card">
      <div className="shared-project-card__metadata">
        <span className="shared-project-card__category">
          PROJECT / {category}
        </span>
        <span
          className="shared-project-card__status"
          data-status={status.toLowerCase().replaceAll(" ", "-")}
        >
          <span
            className="shared-project-card__status-dot"
            aria-hidden="true"
          />
          {status}
        </span>
      </div>

      <ScreenshotGallery
        domain={domain}
        fallbackLogo={
          <>
            <ProjectMark />
            <span className="shared-project-card__mark-link" aria-hidden="true">
              ↗
            </span>
          </>
        }
        logo={logo}
        logoFailed={logoLoadFailed}
        onLogoError={() => setLogoLoadFailed(true)}
        openRequest={openScreenshotsRequest}
        screenshots={screenshots}
        title={title}
      />

      <h3 className="shared-project-card__title">{title}</h3>
      {projectNotes.length > 0 && (
        <aside
          className="shared-project-card__notes"
          aria-label={`${title} notes`}
          hidden={!detailsVisible}
        >
          <ul>
            {projectNotes.map((note, index) => (
              <li key={`${index}-${note}`}>{note}</li>
            ))}
          </ul>
        </aside>
      )}

      <div className="shared-project-card__footer">
        <ul
          className="shared-project-card__technologies"
          aria-label={`${title} technologies`}
        >
          {technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>

        <div className="shared-project-card__actions">
          <button
            aria-label={`${actionLabel}: ${title}`}
            className="shared-project-card__action"
            onClick={onViewProject}
            type="button"
          >
            {actionLabel}
            <span aria-hidden="true">↗</span>
          </button>
          <button
            aria-expanded={detailsVisible}
            aria-label={`${detailsVisible ? "Hide" : "Show"} details for ${title}`}
            className="shared-project-card__action shared-project-card__action--secondary"
            onClick={() => setDetailsVisible((visible) => !visible)}
            type="button"
          >
            Details
          </button>
          {caseStudyUrl?.trim() && (
            <a
              className="shared-project-card__action shared-project-card__action--secondary"
              href={caseStudyUrl.trim()}
              rel="noreferrer"
              target="_blank"
            >
              Case study <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
