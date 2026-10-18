import { useEffect, useId, useRef, type ReactNode } from "react";
import "./Modal.css";

interface ModalActionBase {
  label: string;
  icon?: ReactNode;
  trailingIcon?: ReactNode;
}

export type ModalAction = ModalActionBase &
  (
    | { href: string; target?: "_blank" | "_self"; onClick?: never }
    | { href?: never; target?: never; onClick: () => void }
  );

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  illustration?: ReactNode;
  illustrationLabel?: string;
  titleIcon?: ReactNode;
  subtitle?: string;
  description?: string;
  secondaryMessage?: string;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  footerIcon?: ReactNode;
  footerMessage?: string;
  closeLabel?: string;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Modal({
  open,
  onClose,
  title,
  illustration,
  illustrationLabel,
  titleIcon,
  subtitle,
  description,
  secondaryMessage,
  primaryAction,
  secondaryAction,
  footerIcon,
  footerMessage,
  closeLabel = "Close dialog",
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  const renderAction = (
    action: ModalAction,
    variant: "primary" | "secondary",
  ) => {
    const className = `modal__action modal__action--${variant}`;
    const contents = (
      <>
        {action.icon && (
          <span className="modal__action-icon" aria-hidden="true">
            {action.icon}
          </span>
        )}
        <span>{action.label}</span>
        {action.trailingIcon && (
          <span className="modal__action-trailing" aria-hidden="true">
            {action.trailingIcon}
          </span>
        )}
      </>
    );

    if (action.href) {
      return (
        <a
          className={className}
          href={action.href}
          target={action.target}
          rel={action.target === "_blank" ? "noreferrer" : undefined}
        >
          {contents}
        </a>
      );
    }

    return (
      <button className={className} type="button" onClick={action.onClick}>
        {contents}
      </button>
    );
  };

  return (
    <div
      className="modal__backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        aria-describedby={description ? descriptionId : undefined}
        aria-labelledby={titleId}
        aria-modal="true"
        className={`modal${illustration ? "" : " modal--without-illustration"}`}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <button
          aria-label={closeLabel}
          className="modal__close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <span aria-hidden="true">×</span>
        </button>

        {illustration && (
          <div
            className="modal__illustration"
            role={illustrationLabel ? "img" : undefined}
            aria-label={illustrationLabel}
            aria-hidden={illustrationLabel ? undefined : true}
          >
            {illustration}
          </div>
        )}

        <div className="modal__content">
          <div className="modal__title-row">
            {titleIcon && (
              <span className="modal__title-icon" aria-hidden="true">
                {titleIcon}
              </span>
            )}
            <h2 className="modal__title" id={titleId}>
              {title}
            </h2>
          </div>
          {subtitle && <p className="modal__subtitle">{subtitle}</p>}
          {description && (
            <p className="modal__description" id={descriptionId}>
              {description}
            </p>
          )}
          {secondaryMessage && (
            <p className="modal__secondary-message">{secondaryMessage}</p>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="modal__actions">
              {primaryAction && renderAction(primaryAction, "primary")}
              {secondaryAction && renderAction(secondaryAction, "secondary")}
            </div>
          )}

          {footerMessage && (
            <div className="modal__footer">
              {footerIcon && (
                <span className="modal__footer-icon" aria-hidden="true">
                  {footerIcon}
                </span>
              )}
              <span>{footerMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
