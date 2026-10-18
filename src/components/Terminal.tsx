import { useEffect, useState } from "react";
import "./Terminal.css";

const TERMINAL_TRANSCRIPT = [
  "$ whoami",
  "hadjer — software developer",
  "",
  "$ passion",
  "building useful things with clean code.",
  "",
  "$ tech_stack",
  "TypeScript · Angular · Spring Boot · React  · PostgreSQL",
  "",
  "$ currently",
  "turning ideas into working applications.",
  "",
  "$ status",
  "ready to build something great.",
].join("\n");

interface TerminalProps {
  transcript?: string;
}

export default function Terminal({
  transcript = TERMINAL_TRANSCRIPT,
}: TerminalProps) {
  return <TerminalDisplay key={transcript} transcript={transcript} />;
}

function TerminalDisplay({ transcript }: Required<TerminalProps>) {
  const [typedLength, setTypedLength] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? transcript.length
      : 0,
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (typedLength >= transcript.length) return;

    const timeout = window.setTimeout(
      () => setTypedLength((length) => length + 1),
      55,
    );

    return () => window.clearTimeout(timeout);
  }, [transcript, typedLength]);

  const visibleLines = transcript.slice(0, typedLength).split("\n");
  const lastVisibleLine = visibleLines.reduce(
    (lastIndex, line, index) => (line.length > 0 ? index : lastIndex),
    -1,
  );

  return (
    <section
      className="terminal-window"
      aria-label={`Terminal transcript: ${transcript.replaceAll("\n", ". ")}`}
      role="img"
    >
      <div className="terminal-window__bar" aria-hidden="true">
        <div className="terminal-window__lights">
          <span className="terminal-window__light terminal-window__light--close" />
          <span className="terminal-window__light terminal-window__light--minimize" />
          <span className="terminal-window__light terminal-window__light--maximize" />
        </div>
        <span className="terminal-window__title">terminal</span>
        <span className="terminal-window__menu">•••</span>
      </div>

      <div className="terminal-window__body" aria-hidden="true">
        {visibleLines.map((line, index) =>
          line.length === 0 ? (
            <div className="terminal-window__spacer" key={`spacer-${index}`} />
          ) : (
            <p
              className={`terminal-window__line ${line.startsWith("$ ") ? "terminal-window__line--command" : "terminal-window__line--output"}`}
              key={`line-${index}`}
            >
              {line.startsWith("$ ") ? (
                <>
                  <span className="terminal-window__prompt">$</span>
                  {line.slice(1)}
                </>
              ) : (
                line
              )}
              {index === lastVisibleLine && (
                <span className="terminal-window__cursor">_</span>
              )}
            </p>
          ),
        )}
      </div>
    </section>
  );
}
