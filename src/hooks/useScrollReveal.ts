import { useLayoutEffect } from "react";

const REVEAL_SELECTOR = [
  ".section-header",
  ".about-card",
  ".about-highlight",
  ".shared-project-card",
  ".experience-card",
  ".education-card",
  ".tech-stack-panel__viewport",
  ".tech-stack-panel__footer",
  ".contact-card",
  ".contact-resume",
].join(",");

const STAGGER_STEPS = 4;
const STAGGER_MS = 70;

/** Fades and lifts section content once as it enters the viewport, staggered by index. */
export function useScrollReveal() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    document
      .querySelectorAll<HTMLElement>(".portfolio-section")
      .forEach((section) => {
        section
          .querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
          .forEach((item, index) => {
            item.style.setProperty(
              "--reveal-delay",
              `${(index % STAGGER_STEPS) * STAGGER_MS}ms`,
            );
            item.classList.add("reveal-ready");
            observer.observe(item);
          });
      });

    return () => observer.disconnect();
  }, []);
}
