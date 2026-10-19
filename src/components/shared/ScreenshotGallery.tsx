import { useState, type ReactNode, type RefObject } from "react";
import ScreenshotLightbox from "./ScreenshotLightbox";
import type { ProjectScreenshot } from "./projectTypes";
import "./ScreenshotGallery.css";

interface ScreenshotGalleryProps {
  title: string;
  domain?: string;
  screenshots?: ProjectScreenshot[];
  openRequest?: number;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
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
  returnFocusRef,
  logo,
  logoFailed,
  onLogoError,
  fallbackLogo,
}: ScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dismissedRequest, setDismissedRequest] = useState(0);
  const validScreenshots = screenshots.filter((screenshot) =>
    screenshot.src.trim(),
  );
  const hasScreenshots = validScreenshots.length > 0;
  const lightboxOpen = hasScreenshots && openRequest > dismissedRequest;
  const displayLogo = logo && !logoFailed;

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
      </div>
      {hasScreenshots && (
        <ScreenshotLightbox
          activeIndex={activeIndex}
          images={validScreenshots}
          onChange={setActiveIndex}
          onClose={() => setDismissedRequest(openRequest)}
          open={lightboxOpen}
          projectName={title}
          returnFocusRef={returnFocusRef}
        />
      )}
    </div>
  );
}
