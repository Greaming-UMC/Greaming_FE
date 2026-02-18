import type React from "react";
import { useUIStore } from "../../../../stores/useUIStore";
import {
  makeChallengeRemainText,
  makeChallengeTopicText,
} from "../../utils/challengeHeader";

type Mode = "free" | "daily" | "weekly" | "circle";

export type UploadHeaderProps = {
  mode: Mode;
  actionSlot: React.ReactNode;
};

export function UploadHeader({ mode, actionSlot }: UploadHeaderProps) {
  const dailyChallengeInfo = useUIStore((state) => state.dailyChallengeInfo);
  const weeklyChallengeInfo = useUIStore((state) => state.weeklyChallengeInfo);
  const isChallengeMode = mode === "daily" || mode === "weekly";
  const challengeInfo =
    mode === "daily"
      ? dailyChallengeInfo
      : mode === "weekly"
      ? weeklyChallengeInfo
      : null;

  const title =
    mode === "daily"
      ? "데일리 챌린지"
      : mode === "weekly"
      ? "위클리 챌린지"
      : "그림 업로드";

  const participantsText = challengeInfo
    ? `참여자 ${challengeInfo.participant}명`
    : undefined;
  const remainText = makeChallengeRemainText(challengeInfo?.endAt);
  const topicText = isChallengeMode
    ? makeChallengeTopicText(
        challengeInfo,
        mode === "daily" ? "데일리 챌린지 주제" : "위클리 챌린지 주제",
      )
    : undefined;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="main-title-small-emphasized text-on-surface">
            {title}
          </span>

          {isChallengeMode && (participantsText || remainText) ? (
            <span className="flex items-center gap-2 label-xlarge text-on-surface">
              {participantsText ? <span>{participantsText}</span> : null}
              {participantsText && remainText ? <span>|</span> : null}
              {remainText ? <span>{remainText}</span> : null}
            </span>
          ) : null}
        </div>

        {actionSlot}
      </div>

      {isChallengeMode && topicText ? (
        <div className="flex">
          <span className="sub-title-xlarge text-on-surface">{topicText}</span>
        </div>
      ) : null}
    </div>
  );
}
