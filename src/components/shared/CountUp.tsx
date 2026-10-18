import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
}

const DURATION_MS = 900;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts a leading integer up once when it scrolls into view; other text renders as-is. */
export default function CountUp({ value }: CountUpProps) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match?.[2] ?? "";
  const ref = useRef<HTMLSpanElement>(null);
  const canAnimate = target !== null && !prefersReducedMotion();
  const [shown, setShown] = useState(canAnimate ? 0 : target);

  useEffect(() => {
    const element = ref.current;
    if (!canAnimate || target === null || !element) return;
    if (!("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setShown(target));
      return () => cancelAnimationFrame(id);
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION_MS);
          setShown(Math.round(target * (1 - (1 - progress) ** 3)));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [canAnimate, target]);

  if (target === null) return <>{value}</>;

  return (
    <span ref={ref}>
      <span className="visually-hidden">{value}</span>
      <span aria-hidden="true" className="count-up">
        {shown}
        {suffix}
      </span>
    </span>
  );
}
