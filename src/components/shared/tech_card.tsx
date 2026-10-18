import type { ReactNode } from "react";
import "./tech_card.css";

export interface TechCardProps {
  name: string;
  logo: ReactNode;
  level: number;
}

export default function TechCard({ name, logo, level }: TechCardProps) {
  const filledDots = Math.min(3, Math.max(0, Math.floor(level)));

  return (
    <article
      aria-label={`${name}, experience level ${filledDots} of 3`}
      className="tech-card"
    >
      <span className="tech-card__logo" aria-hidden="true">
        {logo}
      </span>
      <span className="tech-card__name">{name}</span>
      <span className="tech-card__level" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <span
            className={
              index < filledDots
                ? "tech-card__dot tech-card__dot--filled"
                : "tech-card__dot"
            }
            key={index}
          />
        ))}
      </span>
    </article>
  );
}
