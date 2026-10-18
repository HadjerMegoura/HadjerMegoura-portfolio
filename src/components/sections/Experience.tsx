import experience from "../../data/experience.json";
import SectionHeader from "../shared/SectionHeader";
import "./Experience.css";

export default function Experience() {
  return (
    <section
      className="portfolio-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <SectionHeader
        eyebrow="03 / CAREER"
        title="Career Track"
        subtitle={
          <p className="section-header__subtitle">
            The teams and roles that shaped my work.
          </p>
        }
        id="experience-title"
      />

      <ol className="experience-list">
        {experience.map((role) => (
          <li className="experience-card" key={role.id}>
            <div className="experience-card__header">
              <h3 className="experience-card__title">
                {role.title}
                {role.period.includes("Present") && (
                  <span className="experience-card__current">Current</span>
                )}
              </h3>
              <span className="experience-card__period">{role.period}</span>
            </div>
            <p className="experience-card__company">{role.company}</p>
            <ul className="experience-card__description">
              {role.description.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
