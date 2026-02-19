import clsx from "clsx";
import CongratsIcon from "../../../assets/icon/multi/congrats.svg?react";

type Props = {
  open: boolean;
  className?: string;
};

export function OnboardingCompleteModal({ open, className }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* dim */}
      <div className="absolute inset-0 bg-black/60" />

      {/* center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* card (483x348) */}
        <div
          className={clsx(
            "box-border flex flex-col items-center",
            "w-[483px] h-[348px]",
            "pt-[28px] pr-[39px] pb-[28px] pl-[40px]",
            "gap-[10px]",
            "rounded-[28px]",
            "bg-[#FCFCFC]",
            "shadow-[0_0_4px_0_rgba(18,19,21,0.25)]",
            "overflow-hidden",
            className
          )}
        >
          <div className="w-[404px] h-[222px] shrink-0 flex items-center justify-center">
            <CongratsIcon className="w-full h-full" />
          </div>

          <div className="w-[404px] text-center main-title-small-emphasized text-black">
            모든 정보를 입력했어요!
          </div>

          <div className="w-[404px] text-center body-large-emphasized text-schemes-primary">
            잠시후에 홈으로 이동해요...
          </div>
        </div>
      </div>
    </div>
  );
}
