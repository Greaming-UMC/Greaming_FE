import { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;         // 제목
  children: React.ReactNode; // 내용물
  type?: 'default' | 'confirm'; // 기본 모달, 확인 모달
  onConfirm?: () => void;     // 확인 버튼 클릭 시 실행할 함수
  confirmText?: string;       // 확인 버튼 문구
  cancelText?: string;        // 취소 버튼 문구
}


export const Modal = ({ open, onClose, title, children, type = 'default', onConfirm, confirmText, cancelText}: ModalProps) => {
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

  const isConfirm = type === 'confirm';
  
  return (
    <div 
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-surface rounded-large px-6 w-full shadow-xl transition-all 
                    ${isConfirm ? 'max-w-sm py-10' : 'max-w-md py-4'}`}
        role="dialog" 
        aria-modal="true" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center mb-4 shrink-0 ${isConfirm ? 'justify-center' : 'justify-between'}`}> 
          {title && (
            <h2 className="sub-title-xlarge-emphasized text-on-surface">
              {title} 
            </h2>
          )}

          {/* type이 default일 때만 X 버튼 표시 */}
          {!isConfirm && (
            <button 
              type="button"
              className="large-emphasized text-primary px-2 py-1 rounded-medium cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={onClose}
            >
              ⨉
            </button>
          )}
        </div>

        <div className="body-medium text-on-surface-variant-dim overflow-y-auto pr-2 max-h-[40vh]">
          {children}
        </div>

        {type === 'confirm' && (
          <div className="flex gap-2 mt-6 justify-center">

            {/*공용 컴포넌트 버튼에 맞게 수정예정*/}
            <button 
              onClick={onConfirm} 
              type="button"
              className="label-large-emphasized state-layer secondary-opacity-8 rounded-medium bg-secondary px-16 py-3 text-on-secondary"
            >
              {confirmText || '확인'}
            </button>

            <button
              onClick={onClose} 
              type="button"
              className="label-large-emphasized state-layer secondary-opacity-8 rounded-medium bg-primary px-16 py-3 text-secondary"
            >
              {cancelText || '취소'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};