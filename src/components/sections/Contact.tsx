import { useState } from "react";
import contact from "../../data/contact.json";
import SectionHeader from "../shared/SectionHeader";
import "./Contact.css";

const resumeUrl = new URL(
  "../../../design/Hadjer_Megoura_CV.pdf",
  import.meta.url,
).href;

export default function Contact() {
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [copyPhoneLabel, setCopyPhoneLabel] = useState("Copy");

  const copyValue = async (
    value: string,
    setLabel: (label: string) => void,
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      setLabel("Copied");
      window.setTimeout(() => setLabel("Copy"), 1800);
    } catch {
      setLabel("Unavailable");
      window.setTimeout(() => setLabel("Copy"), 1800);
    }
  };

  return (
    <section
      className="portfolio-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <SectionHeader
        eyebrow="06 / CONTACT"
        title="Contact & Connect"
        subtitle={
          <p className="section-header__subtitle section-header__availability">
            <span className="contact-card__status" aria-hidden="true" />
            Available for opportunities
          </p>
        }
        id="contact-title"
      />

      <div className="contact-card">
        <div className="contact-card__intro">
          <h3 className="contact-card__title">
            Let&apos;s build something together.
          </h3>
          <p className="contact-card__description">
            Have an opportunity, a project, or just want to say hello? Reach out
            directly.
          </p>
        </div>

        <div
          className="contact-card__channels"
          aria-label="Ways to get in touch"
        >
          <div className="contact-channel">
            <span className="contact-channel__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3.75 5.75h16.5v12.5H3.75z" />
                <path d="m4.5 6.5 7.5 6 7.5-6" />
              </svg>
            </span>
            <div className="contact-channel__text">
              <span className="contact-channel__label">Direct email</span>
              <a
                className="contact-channel__value"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
            </div>
            <div className="contact-channel__actions">
              <button
                className="contact-button contact-button--quiet"
                type="button"
                onClick={() => void copyValue(contact.email, setCopyLabel)}
                aria-label="Copy email address"
              >
                <svg
                  className="contact-button__icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="8" y="8" width="11" height="12" rx="1.5" />
                  <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v10A1.5 1.5 0 0 0 5.5 17H8" />
                </svg>
                {copyLabel}
              </button>
              <a
                className="contact-button contact-button--primary"
                href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`}
              >
                Send email <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="contact-channel">
            <span className="contact-channel__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6.5 3.75h3l1.5 4-2 1.5a14.2 14.2 0 0 0 5.75 5.75l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.65 1.5A16.1 16.1 0 0 1 5 5.4 1.5 1.5 0 0 1 6.5 3.75Z" />
              </svg>
            </span>
            <div className="contact-channel__text">
              <span className="contact-channel__label">Direct phone</span>
              <a className="contact-channel__value" href={contact.phoneHref}>
                {contact.phone}
              </a>
            </div>
            <div className="contact-channel__actions">
              <button
                className="contact-button contact-button--quiet"
                type="button"
                onClick={() => void copyValue(contact.phone, setCopyPhoneLabel)}
                aria-label="Copy phone number"
              >
                <svg
                  className="contact-button__icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="8" y="8" width="11" height="12" rx="1.5" />
                  <path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v10A1.5 1.5 0 0 0 5.5 17H8" />
                </svg>
                {copyPhoneLabel}
              </button>
              <a
                className="contact-button contact-button--primary"
                href={contact.phoneHref}
              >
                <svg
                  className="contact-button__icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.2 3.75h2.1l1.35 4.1-1.8 1.55a14.2 14.2 0 0 0 5.75 5.75l1.55-1.8 4.1 1.35v2.1a1.5 1.5 0 0 1-1.65 1.5A16.1 16.1 0 0 1 5.7 5.4a1.5 1.5 0 0 1 1.5-1.65Z" />
                </svg>
                Call
              </a>
            </div>
          </div>
        </div>

        <div className="contact-card__meta">
          <nav className="contact-socials" aria-label="Social profiles">
            <a
              className="contact-socials__link"
              href={contact.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
            >
              <svg
                className="contact-socials__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.75a9.25 9.25 0 0 0-2.93 18.02c.46.08.63-.2.63-.45v-1.63c-2.57.56-3.11-1.09-3.11-1.09-.42-1.07-1.03-1.36-1.03-1.36-.84-.58.06-.57.06-.57.93.07 1.42.95 1.42.95.83 1.42 2.18 1.01 2.71.77.08-.6.32-1.01.59-1.24-2.05-.23-4.21-1.03-4.21-4.58 0-1.01.36-1.84.95-2.49-.1-.23-.41-1.18.09-2.46 0 0 .77-.25 2.54.95a8.82 8.82 0 0 1 4.62 0c1.77-1.2 2.54-.95 2.54-.95.5 1.28.19 2.23.09 2.46.59.65.95 1.48.95 2.49 0 3.56-2.17 4.34-4.23 4.57.33.29.63.85.63 1.72v2.46c0 .25.17.54.64.45A9.25 9.25 0 0 0 12 2.75Z" />
              </svg>
              <span>GitHub</span>
              <span className="contact-socials__url">
                github.com/HadjerMegoura
              </span>
              <span className="contact-socials__external" aria-hidden="true">
                ↗
              </span>
            </a>
            <a
              className="contact-socials__link"
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
            >
              <svg
                className="contact-socials__icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M5.2 8.4H2.7V21h2.5V8.4ZM4 6.7a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9ZM21.3 13.8c0-3.8-2.02-5.6-4.72-5.6a4.08 4.08 0 0 0-3.67 2.02V8.4h-2.5V21h2.5v-6.25c0-1.65.31-3.24 2.35-3.24 2.02 0 2.04 1.88 2.04 3.35V21h2.5l-.5-7.2Z" />
              </svg>
              <span>LinkedIn</span>
              <span className="contact-socials__url">
                linkedin.com/in/hadjer-megoura
              </span>
              <span className="contact-socials__external" aria-hidden="true">
                ↗
              </span>
            </a>
          </nav>
          <p className="contact-card__location">
            <span aria-hidden="true">⌖</span> {contact.location}
          </p>
        </div>
      </div>

      <div className="contact-resume">
        <span className="contact-resume__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M6 3.75h8l4 4v12.5H6z" />
            <path d="M14 3.75v4h4M9 13h6M9 16h6" />
          </svg>
        </span>
        <div className="contact-resume__text">
          <p className="contact-resume__name">
            Hadjer_Megoura_CV.pdf <span>PDF · CV</span>
          </p>
          <p className="contact-resume__description">
            A closer look at my experience, projects, and technical skills.
          </p>
        </div>
        <div className="contact-resume__actions">
          <a
            className="contact-button contact-button--quiet"
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span aria-hidden="true">◎</span> View
          </a>
          <a
            className="contact-button contact-button--primary"
            href={resumeUrl}
            download="Hadjer_Megoura_CV.pdf"
          >
            <span aria-hidden="true">↓</span> Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
