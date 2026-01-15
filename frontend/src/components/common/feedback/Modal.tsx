import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { createContext, useContext, useEffect } from 'react';

/* -------------------------------------------------------------------------- */
/* 1. Types & Interfaces                                                     */
/* -------------------------------------------------------------------------- */

type ModalVariant = 'default' | 'confirm';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: ModalVariant;
}


/* -------------------------------------------------------------------------- */
/* 2. Context                                                                */
/* -------------------------------------------------------------------------- */

const ModalContext = createContext<{ variant: ModalVariant; onClose: () => void }>({
  variant: 'default',
  onClose: () => {},
});

const useModalContext = () => useContext(ModalContext);

/* -------------------------------------------------------------------------- */
/* 3. Main Component (Root)                                                  */
/* -------------------------------------------------------------------------- */

const ModalRoot = ({
  open,
  onClose,
  children,
  variant = 'default',
}: ModalProps) => {
  // 1️⃣ 스크롤 잠금 및 ESC 처리 통합 로직 (Hook은 항상 최상단에서 호출되어야 합니다)
  useEffect(() => {
    if (!open) return;

    // 모달이 열릴 때 스크롤 잠금
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      
      // 클린업: 현재 열려있는 다른 모달이 있는지 확인 (중첩 상황 대비)
      const openModals = document.querySelectorAll('[role="dialog"]');
      
      // 모달이 닫힐 때 1개 이하(현재 닫히는 것 포함)라면 스크롤 해제
      if (openModals.length <= 1) {
        html.style.removeProperty('overflow');
        body.style.removeProperty('overflow');
      }
    };
  }, [open, onClose]);

  // 2️⃣ 조건부 렌더링은 Hook 호출 아래에 배치합니다.
  if (!open) return null;

  const portalTarget = document.getElementById('modal-root') ?? document.body;

  return createPortal(
    <ModalContext.Provider value={{ variant, onClose }}>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div  
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-surface rounded-large shadow-xl
            ${variant === 'confirm' ? 'w-full max-w-sm pt-6 px-6 pb-0 text-center' : 'w-full max-w-md p-6'}
          `}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    portalTarget
  );
};

/* -------------------------------------------------------------------------- */
/* 4. Sub Components                                                         */
/* -------------------------------------------------------------------------- */

interface ModalHeaderProps {
  title: string;
  onClose?: () => void;
}

const ModalHeader = ({ title, onClose: customOnClose }: ModalHeaderProps) => {
  const { variant, onClose: contextOnClose } = useModalContext();
  const handleClose = customOnClose || contextOnClose;

  return (
    <div
      className={`mb-4 flex items-center
        ${variant === 'confirm' ? 'justify-center' : 'justify-between'}
      `}
    >
      <h2 className="sub-title-xlarge-emphasized text-on-surface">
        {title}
      </h2>

      {variant === 'default' && (
        <button
          type="button"
          onClick={handleClose}
          className="rounded-medium px-2 py-1 text-primary hover:bg-primary/10 transition-colors"
          aria-label="닫기"
        >
          ⨉
        </button>
      )}
    </div>
  );
};

interface ModalSectionProps {
  children: ReactNode;
}

const ModalBody = ({ children }: ModalSectionProps) => {
  const { variant } = useModalContext();

  return (
    <div
      className={`
        body-medium text-on-surface-variant
        ${variant === 'default'
          ? 'max-h-[60vh] overflow-y-auto pr-4 py-2'
          : 'mt-2'}
      `}
    >
      {children}
    </div>
  );
};

const ModalFooter = ({ children }: ModalSectionProps) => {
  const { variant } = useModalContext();
  if (variant === 'default') return null;

  return (
    <div className="mt-2 flex justify-center gap-2">
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. Compound Export                                                        */
/* -------------------------------------------------------------------------- */

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});