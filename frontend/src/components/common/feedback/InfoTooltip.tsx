import { useState } from "react";
import clsx from "clsx";
import ExclamationIcon from "../../../../assets/icon/multi/exclamation.svg?react";

export function InfoTooltip({
  text,
  className,
}: {
  text: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={clsx("relative inline-flex items-center", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="w-[18px] h-[18px] inline-flex items-center justify-center shrink-0 cursor-help"
        aria-label="info"
      >
        <ExclamationIcon width={18} height={18} />
      </button>

      {open && (
        <div 
          className="absolute left-1/2 top-[28px] z-[100] -translate-x-1/2 pointer-events-none"
          /* 피그마 기준 너비 280px 강제 고정 */
          style={{ width: "280px", minWidth: "280px" }} 
        >
          <div
            className="
              relative bg-[#2B2B2B] text-white text-[14px] font-normal leading-[20px] 
              px-[20px] py-[9px] rounded-[12px] shadow-lg
              /* 줄바꿈(\n)을 유지하면서 너비를 초과하면 자동 줄바꿈 */
              whitespace-pre-wrap break-words
            "
            style={{ 
              writingMode: "horizontal-tb",
              wordBreak: "keep-all" // 한글 단어 단위 줄바꿈 유지
            }}
          >
            {/* 텍스트 렌더링 영역 */}
            <div className="text-left w-full">
               {text}
            </div>
            
            {/* 말풍선 꼬리: 피그마 위치에 맞게 중앙 정렬 */}
            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[#2B2B2B]" />
          </div>
        </div>
      )}
    </div>
  );
}