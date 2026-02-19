import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

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
/* 3. Main Components(root)                                                  */
/* -------------------------------------------------------------------------- */

const ModalRoot = ({ 
  open, 
  onClose, 
  children, 
  variant = 'default' 
}: ModalProps) => {
  // 1. shouldRender를 사용하여 애니메이션이 끝날 때까지 DOM 유지
  const [shouldRender, setShouldRender] = useState(open);
  const [isAnimate, setIsAnimate] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      // 포커스를 위해 이전 요소를 저장
      triggerRef.current = document.activeElement as HTMLElement;
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimate(true));
      });
    } else {
      setIsAnimate(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [open]);

  const getFocusables = () => {
    if (!modalRef.current) return [];
    const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(modalRef.current.querySelectorAll<HTMLElement>(selectors)).filter((el) => {
      const isDisabled = (el as any).disabled || el.hasAttribute('disabled');
      const isVisible = el.offsetWidth > 0 && el.offsetHeight > 0;
      return !isDisabled && isVisible;
    });
  };

  useEffect(() => {
    if (!open || !shouldRender) {
      if (!open) triggerRef.current?.focus();
      return;
    }

    // 스크롤 고정 로직 유지
    const scrollY = window.scrollY;
    const body = document.body;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflowY = 'scroll';

    const focusTimer = setTimeout(() => {
          if (modalRef.current) {
            const focusables = getFocusables();
            if (focusables.length === 0) {
              modalRef.current.focus();
              return;
            }

            // 1. 인풋이나 텍스트에어리어 먼저 찾기
            const inputTarget = focusables.find(el => 
              el.tagName === 'INPUT' || el.tagName === 'TEXTAREA'
            );
            
            // 2. 인풋이 있으면 포커싱, 없으면 그냥 첫 번째 요소(보통 버튼)를 잡습니다.
            if (inputTarget) {
              inputTarget.focus();
            } else {
              focusables[0].focus();
            }
          }
        }, 150); // 애니메이션 안정화 시간

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('[role="dialog"]');
        if (modalRef.current === openModals[openModals.length - 1]) onClose();
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = getFocusables();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus(); e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus(); e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      const openModals = document.querySelectorAll('[role="dialog"]');
      if (openModals.length <= 1) {
        body.style.removeProperty('position');
        body.style.removeProperty('top');
        body.style.removeProperty('width');
        body.style.removeProperty('overflow-y');
        window.scrollTo(0, scrollY);
      }
    };
  }, [open, shouldRender, onClose]); // shouldRender 의존성 추가

  // 2. open 대신 shouldRender로 조건부 렌더링
  if (!shouldRender) return null;

  const portalTarget = document.getElementById('modal-root') ?? document.body;
  const defaultClasses = 'w-full max-w-lg rounded-small';
  const confirmClasses = 'w-full max-w-md pt-6 px-6 pb-0 text-center rounded-large';

  return createPortal(
    <ModalContext.Provider value={{ variant, onClose }}>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          className={`
            bg-surface shadow-xl outline-none transform transition-all duration-300 ease-out
            ${variant === 'confirm' ? confirmClasses : defaultClasses}
            ${isAnimate ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
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
  className?: string;
  titleClassName?: string;
}

const ModalHeader = ({ title, onClose: customOnClose, className, titleClassName }: ModalHeaderProps) => {
  const { variant, onClose: contextOnClose } = useModalContext();
  const handleClose = customOnClose || contextOnClose;

  return (
    <div
      className={clsx(
        "flex items-center",
        variant === 'confirm' 
          ? 'justify-center pt-8' 
          : 'mb-2 justify-between p-3 pl-6 border-b border-outline-variant',
        className 
      )}
    >
      <h2 
        className={clsx(
          titleClassName ? titleClassName : "text-on-surface", 
          variant === 'confirm' ? 'main-title-small-emphasized' : 'sub-title-xlarge-emphasized'
        )}
      >
        {title}
      </h2>

      {variant === 'default' && (
        <button
          type="button"
          onClick={handleClose} 
          className="rounded-medium px-2 py-1 text-primary state-layer secondary-opacity-8 transition-colors"
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
        sub-title-medium text-on-surface
        ${variant === 'default'
          ? 'max-h-[620px] min-h-[620px] overflow-y-auto px-2 py-2'
          : 'flex flex-col items-center justify-center px-6 pb-2 text-center'}
      `}
    >
      {children}
    </div>
  );
};

const ModalFooter = ({ children }: ModalSectionProps) => {
  const { variant } = useModalContext();

  return (
    <div 
      className={`flex justify-center items-center
        ${variant === 'confirm' 
          ? 'pb-12 pt-4'
          : 'p-4 mt-2 gap-2'}
      `}
    >
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