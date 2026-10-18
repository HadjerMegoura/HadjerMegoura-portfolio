import { useEffect, useRef, useState, type ReactNode } from "react";
import ScreenshotLightbox from "./ScreenshotLightbox";
import type { ProjectScreenshot } from "./projectTypes";
import "./ScreenshotGallery.css";

interface ScreenshotGalleryProps {
  title: string;
  domain?: string;
  screenshots?: ProjectScreenshot[];
  openRequest?: number;
  logo?: string | null;
  logoFailed: boolean;
  onLogoError: () => void;
  fallbackLogo: ReactNode;
}

export default function ScreenshotGallery({
  title,
  domain,
  screenshots = [],
  openRequest = 0,
  logo,
  logoFailed,
  onLogoError,
  fallbackLogo,
}: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const validScreenshots = screenshots.filter((screenshot) =>
    screenshot.src.trim(),
  );
  const hasScreenshots = validScreenshots.length > 0;
  const screenshotCount = validScreenshots.length;
  const displayLogo = logo && !logoFailed;

  useEffect(() => {
    if (
      screenshotCount < 2 ||
      lightboxOpen ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (document.hidden) return;
      setActiveIndex((index) => (index + 1) % screenshotCount);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [lightboxOpen, screenshotCount]);

  useEffect(() => {
    if (openRequest > 0 && hasScreenshots) setLightboxOpen(true);
  }, [hasScreenshots, openRequest]);

  return (
    <div className="screenshot-gallery">
      <div className="screenshot-gallery__browser">
        <div className="screenshot-gallery__chrome" aria-hidden="true">
          <span className="screenshot-gallery__window-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="screenshot-gallery__address">
            {domain || "Project preview"}
          </span>
        </div>
        {hasScreenshots ? (
          <>
            <button
              aria-label={`View screenshot ${activeIndex + 1} for ${title}: ${validScreenshots[activeIndex]?.alt || title}`}
              className="screenshot-gallery__trigger"
              onClick={() => setLightboxOpen(true)}
              ref={triggerRef}
              type="button"
            >
              <img
                alt={validScreenshots[activeIndex]?.alt || title}
                className="screenshot-gallery__image"
                height="1000"
                key={validScreenshots[activeIndex]?.src}
                loading="lazy"
                src={validScreenshots[activeIndex]?.src}
                width="1600"
              />
            </button>
            {validScreenshots.length > 1 && (
              <div
                className="screenshot-gallery__pagination"
                aria-label="Screenshots"
              >
                {validScreenshots.map((screenshot, index) => (
                  <button
                    aria-label={`Show screenshot ${index + 1} for ${title}: ${screenshot.alt || title}`}
                    aria-pressed={activeIndex === index}
                    className="screenshot-gallery__page"
                    key={`${screenshot.src}-${index}`}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div
            aria-label={`${title} logo`}
            className="screenshot-gallery__fallback"
            role="img"
          >
            <span
              className={`shared-project-card__mark${
                displayLogo ? " shared-project-card__mark--has-logo" : ""
              }`}
              aria-hidden="true"
            >
              {displayLogo ? (
                <img
                  alt=""
                  className="shared-project-card__logo"
                  height="160"
                  onError={onLogoError}
                  src={logo}
                  width="160"
                />
              ) : (
                fallbackLogo
              )}
            </span>
          </div>
        )}
      </div>
      {hasScreenshots && (
        <ScreenshotLightbox
          activeIndex={activeIndex}
          images={validScreenshots}
          onChange={setActiveIndex}
          onClose={() => setLightboxOpen(false)}
          open={lightboxOpen}
          projectName={title}
          returnFocusRef={triggerRef}
        />
      )}
    </div>
  );
}
