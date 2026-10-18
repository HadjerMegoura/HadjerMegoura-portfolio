import navigation from "../../data/navigation.json";
import contact from "../../data/contact.json";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copyright">
          © {new Date().getFullYear()} Hadjer Megoura. Built with care.
        </p>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          {navigation.map((item) => (
            <a className="site-footer__link" href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
          <a className="site-footer__link" href={`mailto:${contact.email}`}>
            Email <span aria-hidden="true">↗</span>
          </a>
        </nav>

        <a className="site-footer__top" href="#top" aria-label="Back to top">
          ↑
        </a>
      </div>
    </footer>
  );
}
