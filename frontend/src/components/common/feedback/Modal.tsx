import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

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
  variant = 'default' 
}: ModalProps) => {
  
  // 1. 실제로 DOM에 렌더링할지 여부를 결정하는 상태
  const [shouldRender, setShouldRender] = useState(open);
  // 2. 애니메이션 클래스를 적용하기 위한 상태
  const [isAnimate, setIsAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      // 브라우저가 DOM 렌더링을 인지한 후 애니메이션을 시작하도록 약간의 지연(requestAnimationFrame)을 줍니다.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsAnimate(true));
      });
    } else {
      setIsAnimate(false);
      // 애니메이션 시간(200ms)이 지난 후 렌더링 중단
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 200); 
      return () => clearTimeout(timer);
    }
  }, [open]);

  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // 실제 포커스 가능한 요소만 필터링 (가독성 및 재사용)
  const getFocusables = () => {
    if (!modalRef.current) return [];
    const selectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    return Array.from(modalRef.current.querySelectorAll<HTMLElement>(selectors)).filter((el) => {
      const isDisabled = (el as any).disabled || el.hasAttribute('disabled');
      const isVisible = el.offsetWidth > 0 && el.offsetHeight > 0; // 화면에 보이는지 확인
      return !isDisabled && isVisible;
    });
  };

  useEffect(() => {
    if (!open) {
      // 모달 닫힘 시, 모달을 열기 전 포커스 위치로 복귀
      triggerRef.current?.focus();
      return;
    }
    
    // 모달이 열리기 직전, 마지막으로 포커스하고 있던 요소를 저장
    triggerRef.current = document.activeElement as HTMLElement;

    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    //  이미 내부 요소에 포커스가 있는 경우(예: 리렌더링)는 건너뜀
    const focusTimer = requestAnimationFrame(() => {
      if (modalRef.current && !modalRef.current.contains(document.activeElement)) {
        const focusables = getFocusables();
        focusables.length > 0 ? focusables[0].focus() : modalRef.current.focus();
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC 처리
      if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('[role="dialog"]');
        if (modalRef.current === openModals[openModals.length - 1]) onClose();
      }

      // 탭 트랩
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = getFocusables();
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          last.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      const openModals = document.querySelectorAll('[role="dialog"]');
      if (openModals.length <= 1) {
        html.style.removeProperty('overflow');
        body.style.removeProperty('overflow');
      }
    };
  }, [open, onClose]);

  if (!open) return null;

  const portalTarget = document.getElementById('modal-root') ?? document.body;

   {/* 기본모달 스타일링 (수정 예정)*/}
  const defaultClasses = 'w-full max-w-md rounded-small';

   {/* 확인모달 스타일링 (수정 예정)*/}
  const confirmClasses = 'w-full max-w-sm pt-6 px-6 pb-0 text-center rounded-large'

  return createPortal(
    <ModalContext.Provider value={{ variant, onClose }}>
      <div
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4"
        onMouseDown={(e) => {
          // 3️⃣ 배경 클릭 시 의도치 않은 닫힘 방지 (배경에서 마우스를 누를 때만 작동)
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()} // 내부 클릭은 전파 차단
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
}

const ModalHeader = ({ title, onClose: customOnClose }: ModalHeaderProps) => {
  const { variant, onClose: contextOnClose } = useModalContext();
  const handleClose = customOnClose || contextOnClose;

  return (
    <div
      className={`mb-4 flex items-center
        ${variant === 'confirm' ? 'justify-center' : 'justify-between p-3 border-b border-outline-variant'}
      `}
    >
      <h2 className="sub-title-xlarge-emphasized text-on-surface">
        {title}
      </h2>

      {/* 공용컴포넌트 버튼으로 수정 */}
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
        body-medium text-on-surface
        ${variant === 'default'
          ? 'max-h-[60vh] overflow-y-auto px-4 py-2'
          : 'mt-2'}
      `}
    >
      {children}
    </div>
  );
};

const ModalFooter = ({ children }: ModalSectionProps) => {

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