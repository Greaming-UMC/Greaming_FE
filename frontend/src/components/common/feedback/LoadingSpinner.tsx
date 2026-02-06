import clsx from "clsx";
import type { CSSProperties } from "react";
import LogoDots from "../../../assets/logo/animated-logo.svg?react";
import "./LoadingSpinner.css";

type LoadingSpinnerProps = {
  size?: number;
  durationMs?: number;
  className?: string;
};

type LoadingOverlayProps = LoadingSpinnerProps & {
  overlayClassName?: string;
};

export const LoadingSpinner = ({
  size = 116,
  durationMs = 1400,
  className,
}: LoadingSpinnerProps) => {
  const style: CSSProperties = {
    ["--logo-draw-duration" as keyof CSSProperties]: `${durationMs}ms`,
  };

  return (
    <div className={clsx("loading-spinner", className)} style={style} aria-hidden="true">
      <LogoDots width={size} height={size} className="loading-spinner__svg" />
    </div>
  );
};

export const LoadingOverlay = ({
  overlayClassName,
  ...spinnerProps
}: LoadingOverlayProps) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        overlayClassName,
      )}
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner {...spinnerProps} />
    </div>
  );
};
