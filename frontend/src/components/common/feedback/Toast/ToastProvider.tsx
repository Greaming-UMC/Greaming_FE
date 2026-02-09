import { createContext, useContext, useState, useCallback, type ReactNode} from "react";
import { createPortal } from "react-dom";
import ToastItem from "./ToastItem";

// 명칭 통일: ToastVariant
export type ToastVariant = "success" | "error" | "info";

interface ToastContextType {
  // 매개변수 명칭도 variant로 변경
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; variant: ToastVariant } | null>(null);

  const showToast = useCallback((message: string, variant: ToastVariant = "success") => {
    setToast({ message, variant });
    
    // 이전 타이머가 있다면 클리어해주는 로직을 추가하면 더 안정적입니다.
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && createPortal(
        // ToastItem에 variant props로 전달
        <ToastItem message={toast.message} variant={toast.variant} />,
        document.getElementById("modal-root") || document.body
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};