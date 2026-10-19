import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import navigation from "../../data/navigation.json";
import "./Header.css";

export default function Header() {
  const [activeHref, setActiveHref] = useState(() => window.location.hash);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const active = nav.querySelector<HTMLElement>('[aria-current="location"]');
    nav.style.setProperty("--indicator-opacity", active ? "1" : "0");
    if (!active) return;
    nav.style.setProperty("--indicator-x", `${active.offsetLeft}px`);
    nav.style.setProperty("--indicator-y", `${active.offsetTop}px`);
    nav.style.setProperty("--indicator-w", `${active.offsetWidth}px`);
    nav.style.setProperty("--indicator-h", `${active.offsetHeight}px`);
  }, []);

  useLayoutEffect(() => {
    updateIndicator();
  }, [activeHref, updateIndicator]);

  useEffect(() => {
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      const activationLine = window.innerHeight * 0.45;
      const activeSection = sections.reduce<HTMLElement | null>(
        (active, section) =>
          section.getBoundingClientRect().top <= activationLine
            ? section
            : active,
        null,
      );
      setActiveHref(activeSection ? `#${activeSection.id}` : "");

      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      headerRef.current?.style.setProperty(
        "--scroll-progress",
        Math.min(1, Math.max(0, progress)).toFixed(4),
      );
      setScrolled(window.scrollY > 8);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled} ref={headerRef}>
      <a className="site-brand" href="#top" aria-label="Hadjer Megoura home">
        <img
          alt=""
          className="site-brand__avatar"
          height="36"
          src="/hadjer.jpeg"
          width="36"
        />
        <span className="site-brand__name">Hadjer Megoura</span>
        <span className="site-brand__role">Software Engineer</span>
      </a>

      <nav className="site-nav" aria-label="Main navigation" ref={navRef}>
        <span className="site-nav__indicator" aria-hidden="true" />
        {navigation.map((item) => (
          <a
            className="site-nav__link"
            href={item.href}
            key={item.label}
            aria-current={activeHref === item.href ? "location" : undefined}
            onClick={() => setActiveHref(item.href)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="site-header__contact" href="#contact">
        Get in Touch
        <span aria-hidden="true">↗</span>
      </a>
      <span className="site-header__progress" aria-hidden="true" />
    </header>
  );
}
