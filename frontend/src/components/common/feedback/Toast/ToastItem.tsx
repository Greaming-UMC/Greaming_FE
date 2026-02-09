import clsx from "clsx";

type ToastVariant = "success" | "error" | "info";

interface ToastItemProps {
  message: string;
  variant?: ToastVariant; // type 대신 variant 사용
}

const VARIANT_STYLES: Record<ToastVariant, string> = {
  success: "bg-secondary-variant",
  error: "bg-error",
  info: "bg-primary",
};

function ToastItem({ message, variant = "success" }: ToastItemProps) {
  return (
    <div
      className={clsx(
        "fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999]",
        "flex items-center px-6 py-4 rounded-medium shadow-lg animate-fade-in-up",
        "label-xlarge-emphasized text-white",
        VARIANT_STYLES[variant] // 매핑된 스타일 적용
      )}
    >
      {message}
    </div>
  );
}

export default ToastItem;