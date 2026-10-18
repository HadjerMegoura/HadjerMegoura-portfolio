import techStack from "../../data/tech-stack.json";
import TechCard from "../shared/tech_card";
import SectionHeader from "../shared/SectionHeader";
import "./TechStack.css";

const technologyLogoAssets = import.meta.glob<string>(
  "../../assets/tech_logos/*.{svg,png}",
  { eager: true, import: "default", query: "?url" },
);

export default function TechStack() {
  const technologies = techStack;

  return (
    <section
      className="portfolio-section"
      id="tech-stack"
      aria-labelledby="tech-stack-title"
    >
      <div className="tech-stack-panel">
        <SectionHeader
          eyebrow="05 / TECHNOLOGIES"
          title="Tech Stack"
          subtitle={
            <div className="tech-stack-panel__summary">
              <p className="section-header__subtitle">
                Core tools &amp; frameworks I use
              </p>
            </div>
          }
          id="tech-stack-title"
        />

        <div
          className="tech-stack-panel__viewport"
          role="region"
          aria-label="Technologies and experience levels"
          tabIndex={0}
        >
          <div className="tech-stack-panel__track">
            {[false, true].map((isDuplicate) => (
              <ul
                className="tech-stack-panel__group"
                key={isDuplicate ? "duplicate" : "original"}
                aria-hidden={isDuplicate}
                inert={isDuplicate}
              >
                {technologies.map((technology) => (
                  <li key={technology.name}>
                    <TechCard
                      name={technology.name}
                      logo={
                        technologyLogoAssets[
                          `../../assets/tech_logos/${technology.logo}`
                        ] ? (
                          <img
                            alt=""
                            className="tech-card__logo-image"
                            src={
                              technologyLogoAssets[
                                `../../assets/tech_logos/${technology.logo}`
                              ]
                            }
                          />
                        ) : (
                          <span>{technology.logo}</span>
                        )
                      }
                      level={technology.level}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
