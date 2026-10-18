import education from "../../data/education.json";
import SectionHeader from "../shared/SectionHeader";
import "./Education.css";

export default function Education() {
  return (
    <section
      className="portfolio-section"
      id="education"
      aria-labelledby="education-title"
    >
      <SectionHeader
        eyebrow="04 / EDUCATION"
        title="Academic Background"
        subtitle={
          <p className="section-header__subtitle">
            The studies that built my foundation in software engineering.
          </p>
        }
        id="education-title"
      />

      <ol className="education-list">
        {education.map((item) => (
          <li className="education-card" key={item.id}>
            <div className="education-card__header">
              <div className="education-card__heading">
                <h3 className="education-card__degree">{item.degree}</h3>
                <span className="education-card__type">
                  {item.degree.startsWith("Master")
                    ? "Master's program"
                    : "Engineering program"}
                </span>
              </div>
              <span className="education-card__period">{item.period}</span>
            </div>
            <p className="education-card__institution">{item.institution}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
