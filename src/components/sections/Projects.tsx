import { useState } from "react";
import tiredGirl from "../../assets/illustrations/tired_girl.png";
import ProjectCard from "../shared/ProjectCard";
import SectionHeader from "../shared/SectionHeader";
import type { ProjectScreenshot } from "../shared/projectTypes";
import projects from "../../data/projects.json";
import "./Projects.css";
import Modal from "../Modal";

const projectLogoAssets = import.meta.glob<string>(
  "../../assets/**/*.{svg,png,jpg,jpeg,webp}",
  { eager: true, import: "default", query: "?url" },
);

function resolveProjectAsset(
  asset: string | null | undefined,
): string | undefined {
  if (!asset) return undefined;
  if (/^(https?:|data:|\/)/i.test(asset)) return asset;

  const assetPath = Object.keys(projectLogoAssets).find((path) =>
    path.endsWith(`/${asset}`),
  );
  return assetPath ? projectLogoAssets[assetPath] : `/${asset}`;
}

function resolveProjectDomain(url: string | null): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}

export default function Projects() {
  const [projectWithoutUrl, setProjectWithoutUrl] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [screenshotRequest, setScreenshotRequest] = useState<{
    projectId: string;
    requestId: number;
  } | null>(null);
  return (
    <section
      className="portfolio-section"
      id="projects"
      aria-labelledby="projects-title"
    >
      <SectionHeader
        eyebrow="02 / PROJECTS"
        title="Selected Projects"
        subtitle={
          <p className="section-header__subtitle">
            A few things I have been working on lately.
          </p>
        }
        id="projects-title"
      />

      <div className="projects-grid">
        <ol className="projects-grid__list">
          {projects.map((project) => (
            <li className="projects-grid__item" key={project.id}>
              <ProjectCard
                title={project.name}
                category={project.category}
                notes={project.notes}
                technologies={project.technologies}
                logo={resolveProjectAsset(project.logo)}
                domain={resolveProjectDomain(project.url)}
                openScreenshotsRequest={
                  screenshotRequest?.projectId === project.id
                    ? screenshotRequest.requestId
                    : 0
                }
                screenshots={(project.screenshots as ProjectScreenshot[]).map(
                  (screenshot) => ({
                    ...screenshot,
                    src: resolveProjectAsset(screenshot.src) ?? screenshot.src,
                  }),
                )}
                role={project.role}
                impact={project.impact}
                challenge={project.challenge}
                caseStudyUrl={project.caseStudyUrl}
                status={project.status}
                actionLabel="View Live Project"
                onViewProject={() => {
                  const projectUrl = project.url?.trim();
                  if (projectUrl) {
                    window.open(projectUrl, "_blank", "noopener,noreferrer");
                    return;
                  }
                  setProjectWithoutUrl({ id: project.id, name: project.name });
                }}
              />
            </li>
          ))}
        </ol>
      </div>

      <Modal
        open={projectWithoutUrl !== null}
        onClose={() => setProjectWithoutUrl(null)}
        illustration={
          <img alt="" className="modal__illustration-image" src={tiredGirl} />
        }
        illustrationLabel="A tired developer working at a laptop with a cup of coffee"
        titleIcon="☕"
        title="Oh sorry..."
        subtitle="Still working on it!"
        description={`${projectWithoutUrl?.name ?? "This project"} isn’t deployed yet, but I’m still putting the final touches (with a lot of coffee ☕).`}
        secondaryMessage={
          projects.find((project) => project.id === projectWithoutUrl?.id)
            ?.screenshots.length
            ? "Want to see the screenshots instead?"
            : "No screenshots are available for this project yet."
        }
        primaryAction={
          projects.find((project) => project.id === projectWithoutUrl?.id)
            ?.screenshots.length
            ? {
                label: "View Screenshots",
                icon: <span>▧</span>,
                trailingIcon: "→",
                onClick: () => {
                  if (!projectWithoutUrl) return;
                  setScreenshotRequest((request) => ({
                    projectId: projectWithoutUrl.id,
                    requestId: (request?.requestId ?? 0) + 1,
                  }));
                  setProjectWithoutUrl(null);
                },
              }
            : undefined
        }
        secondaryAction={{
          label: "Explore GitHub",
          icon: <span>◉</span>,
          trailingIcon: "→",
          href: "https://github.com/HadjerMegoura",
          target: "_blank",
        }}
        footerIcon="◷"
        footerMessage="Maybe later... (with more coffee ☕)"
      />
    </section>
  );
}
