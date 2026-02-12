// import clsx from "clsx";
// import type { CSSProperties } from "react";
// import LogoDots from "../../../assets/logo/animated-logo.svg?react";
// import "./LoadingSpinner.css";

// type LoadingSpinnerProps = {
//   size?: number;
//   durationMs?: number;
//   className?: string;
// };

// type LoadingOverlayProps = LoadingSpinnerProps & {
//   overlayClassName?: string;
// };

// export const LoadingSpinner = ({
//   size = 116,
//   durationMs = 1400,
//   className,
// }: LoadingSpinnerProps) => {
//   const style: CSSProperties = {
//     ["--logo-draw-duration" as keyof CSSProperties]: `${durationMs}ms`,
//   };

//   return (
//     <div className={clsx("loading-spinner", className)} style={style} aria-hidden="true">
//       <LogoDots width={size} height={size} className="loading-spinner__svg" />
//     </div>
//   );
// };

// export const LoadingOverlay = ({
//   overlayClassName,
//   ...spinnerProps
// }: LoadingOverlayProps) => {
//   return (
//     <div
//       className={clsx(
//         "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
//         overlayClassName,
//       )}
//       role="status"
//       aria-live="polite"
//     >
//       <LoadingSpinner {...spinnerProps} />
//     </div>
//   );
// };
import clsx from "clsx";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import LogoDots from "../../../assets/logo/animated-logo.svg?react";
import "./LoadingSpinner.css";

type LoadingSpinnerProps = {
  size?: number;
  durationMs?: number;
  className?: string;

  /** ✅ 애니메이션 1회 끝나면 호출 */
  onComplete?: () => void;

  /** ✅ 반복 횟수: 1이면 1번만 그리고 끝 (기본 1) */
  iterations?: number;
};

type LoadingOverlayProps = LoadingSpinnerProps & {
  overlayClassName?: string;
};

export const LoadingSpinner = ({
  size = 116,
  durationMs = 1400,
  className,
  onComplete,
  iterations = 1,
}: LoadingSpinnerProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);

  const style: CSSProperties = {
    ["--logo-draw-duration" as keyof CSSProperties]: `${durationMs}ms`,
    ["--logo-draw-iterations" as keyof CSSProperties]: String(iterations),
  };

  useEffect(() => {
    if (!onComplete) return;

    const root = rootRef.current;
    if (!root) return;

    // 로고 path(실제로 애니메이션 걸린 요소)에 이벤트를 걸어야 정확함
    const path = root.querySelector(".logo-path") as SVGElement | null;
    if (!path) return;

    const handleEnd = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      onComplete();
    };

    // stroke/fill 둘 다 animationend가 올 수 있어서 "한 번만" 처리
    path.addEventListener("animationend", handleEnd);

    return () => {
      path.removeEventListener("animationend", handleEnd);
    };
  }, [onComplete]);

  return (
    <div ref={rootRef} className={clsx("logo-draw", className)} style={style} aria-hidden="true">
      <LogoDots width={size} height={size} className="logo-draw__svg" />
    </div>
  );
};

export const LoadingOverlay = ({ overlayClassName, ...spinnerProps }: LoadingOverlayProps) => {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        overlayClassName
      )}
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner {...spinnerProps} />
    </div>
  );
};
