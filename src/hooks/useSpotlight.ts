import { useEffect } from "react";

/** Feeds the pointer position to project cards as --mx/--my for the CSS spotlight. */
export function useSpotlight() {
  useEffect(() => {
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || reduceMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as Element).closest<HTMLElement>(
        ".shared-project-card",
      );
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);
}
