import heroIllustration from "../../assets/illustrations/hero_illustration.png";
import contact from "../../data/contact.json";
import Terminal from "../Terminal";
import "./Hero.css";

const resumeUrl = "/Hadjer_Megoura_CV.pdf";

export default function Hero() {
  return (
    <main className="hero-section" id="top">
      <div className="hero-section__illustration-wrap">
        <img
          className="hero-illustration"
          src={heroIllustration}
          alt="Developer holding a fly swatter, ready to squash bugs"
        />
      </div>

      <div className="hero-content">
        <h1 className="hero-content__title">
          Software <span className="hero-content__accent">Engineer</span>
        </h1>
        <Terminal />

        <div className="hero-info" aria-label="Location and availability">
          <span className="hero-info__pill hero-info__location">
            {contact.location} · Open to remote
          </span>
          <span className="hero-info__pill hero-info__availability">
            <span className="hero-info__status-dot" aria-hidden="true" />
            Available for opportunities
          </span>
        </div>

        <div className="hero-actions">
          <a
            className="hero-actions__button hero-actions__button--primary"
            href="#projects"
            aria-label="View projects"
          >
            View Projects <span aria-hidden="true">↓</span>
          </a>
          <a
            className="hero-actions__button hero-actions__button--secondary"
            href={resumeUrl}
            download="Hadjer_Megoura_CV.pdf"
            aria-label="Download CV"
          >
            Download CV <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </main>
  );
}
