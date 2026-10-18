import contact from "../../data/contact.json";
import aboutIllustration from "../../assets/illustrations/about_illustrator.png";
import CountUp from "../shared/CountUp";
import SectionHeader from "../shared/SectionHeader";
import "./About.css";

const focusAreas = [
  "Angular Development",
  "TypeScript & State Management",
  "REST API Integration",
  "Full-Stack Delivery",
];

const highlights = [
  {
    label: "Professional Experience",
    value: "2+ Years",
    detail: "Working on production software",
    tone: "accent",
    icon: "calendar",
  },
  {
    label: "Project Experience",
    value: "4+ Projects",
    detail: "Commerce, education, CRM & ERP",
    tone: "positive",
    icon: "folder",
  },
  {
    label: "Current Focus",
    value: "Angular Software Engineer",
    detail: "Interfaces, APIs & reliable systems",
    tone: "info",
    icon: "target",
  },
  {
    label: "Based In",
    value: contact.location,
    detail: "Open to remote opportunities",
    tone: "neutral",
    icon: "location",
  },
];

type HighlightIconName = (typeof highlights)[number]["icon"];

function HighlightIcon({ name }: { name: HighlightIconName }) {
  const sharedProps = {
    "aria-hidden": true as const,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 2,
    viewBox: "0 0 24 24",
  };

  if (name === "calendar") {
    return (
      <svg {...sharedProps}>
        <rect height="16" rx="2" width="18" x="3" y="5" />
        <path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
      </svg>
    );
  }

  if (name === "folder") {
    return (
      <svg {...sharedProps}>
        <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H10l2 2h6.5A2.5 2.5 0 0 1 21 8.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />
      </svg>
    );
  }

  if (name === "target") {
    return (
      <svg {...sharedProps}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v2M22 12h-2M12 22v-2M2 12h2" />
      </svg>
    );
  }

  return (
    <svg {...sharedProps}>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function About() {
  return (
    <section
      className="portfolio-section about-section"
      id="about"
      aria-labelledby="about-title"
    >
      <SectionHeader
        eyebrow="01 / ABOUT"
        title="Engineering with Craft & Pragmatism"
        subtitle={
          <p className="section-header__subtitle">
            I build useful software with a focus on clarity, quality, and
            impact.
          </p>
        }
        id="about-title"
      />

      <div className="about-layout">
        <article className="about-card">
          <p className="about-card__label">A LITTLE ABOUT ME</p>
          <svg
            aria-hidden="true"
            className="about-card__illustration"
            viewBox="0 0 1536 1024"
          >
            <defs>
              <filter
                colorInterpolationFilters="sRGB"
                height="120%"
                id="about-remove-checkerboard"
                width="120%"
                x="-10%"
                y="-10%"
              >
                <feColorMatrix
                  in="SourceGraphic"
                  result="red-green"
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 10 -10 0 0 -0.25"
                />
                <feColorMatrix
                  in="SourceGraphic"
                  result="green-red"
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -10 10 0 0 -0.25"
                />
                <feColorMatrix
                  in="SourceGraphic"
                  result="green-blue"
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 10 -10 0 -0.25"
                />
                <feColorMatrix
                  in="SourceGraphic"
                  result="blue-green"
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 -10 10 0 -0.25"
                />
                <feColorMatrix
                  in="SourceGraphic"
                  result="blue-red"
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 -10 0 10 0 -0.25"
                />
                <feColorMatrix
                  in="SourceGraphic"
                  result="red-blue"
                  type="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 10 0 -10 0 -0.25"
                />
                <feBlend
                  in="red-green"
                  in2="green-red"
                  mode="lighten"
                  result="mask-one"
                />
                <feBlend
                  in="mask-one"
                  in2="green-blue"
                  mode="lighten"
                  result="mask-two"
                />
                <feBlend
                  in="mask-two"
                  in2="blue-green"
                  mode="lighten"
                  result="mask-three"
                />
                <feBlend
                  in="mask-three"
                  in2="blue-red"
                  mode="lighten"
                  result="mask-four"
                />
                <feBlend
                  in="mask-four"
                  in2="red-blue"
                  mode="lighten"
                  result="color-mask"
                />
                <feComposite
                  in="SourceGraphic"
                  in2="color-mask"
                  operator="in"
                />
              </filter>
            </defs>
            <image
              filter="url(#about-remove-checkerboard)"
              height="1024"
              href={aboutIllustration}
              width="1536"
            />
          </svg>
          <div className="about-card__copy">
            <p>
              I&apos;m a software engineer who enjoys turning complex
              requirements into clear, dependable digital experiences. I work
              across the stack, with a particular focus on building maintainable
              front ends and connecting them to robust APIs.
            </p>
            <p>
              From production e-commerce platforms to focused education tools, I
              care about the details that make software feel thoughtful:
              accessible interactions, reusable architecture, and a smooth
              experience for the people using it.
            </p>
            <p>
              I value practical problem-solving, continuous learning, and close
              collaboration. My goal is always to ship work that is easy to use
              today and easy to build on tomorrow.
            </p>
          </div>

          <ul className="about-focus-list" aria-label="Areas of focus">
            {focusAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </article>

        <div className="about-highlights" aria-label="Career highlights">
          {highlights.map((highlight) => (
            <article
              className={`about-highlight about-highlight--${highlight.tone}`}
              key={highlight.label}
            >
              <span className="about-highlight__icon">
                <HighlightIcon name={highlight.icon} />
              </span>
              <div className="about-highlight__content">
                <p className="about-highlight__label">{highlight.label}</p>
                <p className="about-highlight__value">
                  <CountUp value={highlight.value} />
                </p>
                <p className="about-highlight__detail">{highlight.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
