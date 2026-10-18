import type { ReactNode } from "react";

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: ReactNode;
  id: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  id,
}: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div className="section-header__main">
        <p className="section-header__eyebrow">{eyebrow}</p>
        <h2 className="section-header__title" id={id}>
          {title}
        </h2>
      </div>
      <div className="section-header__aside">{subtitle}</div>
    </header>
  );
}
