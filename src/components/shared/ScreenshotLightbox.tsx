import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type RefObject,
} from "react";
import type { ProjectScreenshot } from "./projectTypes";
import "./ScreenshotLightbox.css";

interface ScreenshotLightboxProps {
  images: ProjectScreenshot[];
  activeIndex: number;
  open: boolean;
  projectName: string;
  onChange: (index: number) => void;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}

export default function ScreenshotLightbox({
  images,
  activeIndex,
  open,
  projectName,
  onChange,
  onClose,
  returnFocusRef,
}: ScreenshotLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const activeImage = images[activeIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const close = () => {
    if (dialogRef.current?.open) dialogRef.current.close();
    onClose();
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (images.length < 2) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      onChange((activeIndex + 1) % images.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onChange((activeIndex - 1 + images.length) % images.length);
    }
  };

  if (!activeImage) return null;

  return (
    <dialog
      aria-labelledby={titleId}
      className="screenshot-lightbox"
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
      onKeyDown={handleKeyDown}
      ref={dialogRef}
    >
      <div className="screenshot-lightbox__toolbar">
        <h2 className="screenshot-lightbox__title" id={titleId}>
          {projectName}
        </h2>
        <button
          aria-label="Close screenshot"
          className="screenshot-lightbox__close"
          onClick={close}
          ref={closeButtonRef}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="screenshot-lightbox__stage">
        <img
          alt={activeImage.alt || projectName}
          className="screenshot-lightbox__image"
          height="1000"
          src={activeImage.src}
          width="1600"
        />
        {images.length > 1 && (
          <>
            <button
              aria-label="Previous screenshot"
              className="screenshot-lightbox__navigation screenshot-lightbox__navigation--previous"
              onClick={() =>
                onChange((activeIndex - 1 + images.length) % images.length)
              }
              type="button"
            >
              <span aria-hidden="true">‹</span>
            </button>
            <button
              aria-label="Next screenshot"
              className="screenshot-lightbox__navigation screenshot-lightbox__navigation--next"
              onClick={() => onChange((activeIndex + 1) % images.length)}
              type="button"
            >
              <span aria-hidden="true">›</span>
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <p className="screenshot-lightbox__count" aria-live="polite">
          {activeIndex + 1} / {images.length}
        </p>
      )}
    </dialog>
  );
}
