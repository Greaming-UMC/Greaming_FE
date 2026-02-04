import type React from "react";
import clsx from "clsx";

type Mode = "daily" | "weekly" | "circle";

export type UploadHeaderProps = {
  mode: Mode;

  /** daily/weekly에서만 사용 */
  participantsText?: string;
  remainText?: string;

  /** "데일리 챌린지 주제" / "위클리 챌린지 주제" / "'써클이름'에 그림 업로드" */
  topicText: string;

  /** 오른쪽 끝: UploadPage가 준 업로드 버튼 노드 */
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
      {/* 1줄: (daily/weekly) 왼쪽 텍스트 + 오른쪽 업로드 버튼 */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          {title ? (
            <span
              style={{
                color:
                  "var(--Grayscale-Grayscale1, var(--Schemes-Primary, #121315))",
                fontFamily: "Pretendard",
                fontSize: "var(--Static-MainTitle-Small-Size, 24px)",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "var(--Static-MainTitle-Small-Line-Height, 30px)",
                letterSpacing: "var(--Static-MainTitle-Small-Tracking, 0)",
              }}
            >
              {title}
            </span>
          ) : null}

          {participantsText || remainText ? (
            <span
              className={clsx("flex items-center gap-[8px]")}
              style={{
                color:
                  "var(--Grayscale-Grayscale1, var(--Schemes-Primary, #121315))",
                fontFamily: '"Pretendard Variable"',
                fontSize: 16,
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "20px",
                letterSpacing: "var(--Static-Body-Medium-Tracking, 0.25px)",
              }}
            >
              {participantsText ? <span>{participantsText}</span> : null}
              {participantsText && remainText ? <span>|</span> : null}
              {remainText ? <span>{remainText}</span> : null}
            </span>
          ) : null}
        </div>

        {/* 오른쪽 업로드 버튼(같은 선상) */}
        {actionSlot}
      </div>

      {/* 2줄: 주제 */}
      <div
        style={{
          color:
            "var(--Grayscale-Grayscale1, var(--Schemes-Primary, #121315))",
          fontFamily: '"Pretendard Variable"',
          fontSize: 20,
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        {topicText}
      </div>
    </div>
  );
}
