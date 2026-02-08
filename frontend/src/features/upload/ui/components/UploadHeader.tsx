import type React from "react";
import clsx from "clsx";

type Mode = "daily" | "weekly" | "circle";

export type UploadHeaderProps = {
  mode: Mode;
  participantsText?: string;
  remainText?: string;
  topicText: string;
  actionSlot: React.ReactNode;
};

export function UploadHeader({
  mode,
  participantsText,
  remainText,
  topicText,
  actionSlot,
}: UploadHeaderProps) {
  const title =
    mode === "daily"
      ? "데일리 챌린지"
      : mode === "weekly"
      ? "위클리 챌린지"
      : undefined;

  return (
    <div className="w-full flex flex-col gap-[6px]">
      {/* 1줄 */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          {title ? (
            <span className="main-title-small-emphasized text-on-surface">
              {title}
            </span>
          ) : null}

          {participantsText || remainText ? (
            <span className="flex items-center gap-[8px] body-medium-emphasized text-on-surface">
              {participantsText ? <span>{participantsText}</span> : null}
              {participantsText && remainText ? <span>|</span> : null}
              {remainText ? <span>{remainText}</span> : null}
            </span>
          ) : null}
        </div>

        {actionSlot}
      </div>

      {/* 2줄: 주제 */}
      <div className="sub-title-xlarge-emphasized text-on-surface">
        {topicText}
      </div>
    </div>
  );
}







