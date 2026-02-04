import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactElement, ReactNode } from "react";

type DropdownProps = {
  trigger: ReactElement<any> | ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (next: boolean) => void;
  align?: "left" | "right";
  className?: string;
  menuClassName?: string;
};

const Dropdown = ({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  align = "right",
  className = "",
  menuClassName = "",
}: DropdownProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const rootRef = useRef<HTMLDivElement>(null);

  const setOpen = (next: boolean) => {
    if (open === undefined) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const triggerNode = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<any>, {
        onClick: (event: any) => {
          const original = (trigger as ReactElement<any>).props?.onClick;
          if (typeof original === "function") original(event);
          setOpen(!isOpen);
        },
      })
    : (
        <span onClick={() => setOpen(!isOpen)}>
          {trigger}
        </span>
      );

  return (
    <div ref={rootRef} className={`relative inline-flex ${className}`}>
      {triggerNode}
      {isOpen && (
        <div
          className={`absolute z-50 mt-[4px] ${
            align === "right" ? "right-0" : "left-0"
          } ${menuClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
