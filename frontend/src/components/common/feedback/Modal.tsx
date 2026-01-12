import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;         // 제목
  children: React.ReactNode; // 내용물
  showCloseButton?: boolean; // X 버튼
}

// 가이드 준수: named export 사용
export const Modal = ({ open, onClose, title, children, showCloseButton = true}: ModalProps) => {
  if (!open) return null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose(); // ESC 키 누를 시 모달 창 닫기
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // 모달 창 밖 클릭 시 닫기
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  return (
    <div 
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-large py-4 px-6 max-w-md w-full shadow-xl"
        role="dialog" 
        aria-modal="true" 
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between mb-4 shrink-0"> 
          {title && (
            <h2 className="sub-title-xlarge-emphasized text-on-surface">
              {title} 
            </h2>
          )}

          {showCloseButton &&(
            <button 
            type="button"
            className="large-emphasized text-primary px-4 py-2 rounded-medium cursor-pointer state-layer primary-opacity-8 transition-colors"
            onClick={onClose}
          >
          ⨉
          </button>
          )}
        </div>

        <div className="body-medium text-on-surface-variant-dim overflow-y-auto max-h-[40vh] pr-2">
          {children}
        </div>

      </div>
    </div>
  );
};