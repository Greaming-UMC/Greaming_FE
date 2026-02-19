import { Card } from "../../../../components/common";
import Logo from "../../../../components/common/Logo";
import Icon from "../../../../components/common/Icon";

import DailyBlob from "../../../../assets/icon/multi/draw_secondary.svg?react";
import WeeklyBlob from "../../../../assets/icon/multi/draw.svg?react";

interface Props {
  type: "DAILY" | "WEEKLY";
  title: string;
  participantText?: string;
  timeLeftText?: string;
  onJoin?: (type: "DAILY" | "WEEKLY") => void;
  isActive?: boolean;
}

const PRE_TITLE: Record<Props["type"], string> = {
  DAILY: "Daily Challenge",
  WEEKLY: "Weekly Challenge",
};

const HeroChallengeCard = ({
  type,
  title,
  participantText,
  timeLeftText,
  onJoin,
  isActive = false,
}: Props) => {
  const isDaily = type === "DAILY";
  const Blob = isDaily ? DailyBlob : WeeklyBlob;
  const hoverLogoName = isDaily ? "mono-white" : "secondary";

  const safeParticipantText = participantText?.trim();
  const safeTimeLeftText = timeLeftText?.trim();

  const safeTopic = title.trim();

  const metaText =
    safeParticipantText && safeTimeLeftText
      ? `${safeParticipantText} | ${safeTimeLeftText}`
      : safeParticipantText ?? safeTimeLeftText;

  return (
    <Card.Root
      clickable={Boolean(onJoin)}
      className="relative w-[702px] h-[352px] bg-transparent overflow-visible group border-none shadow-none"
      onClick={() => onJoin?.(type)}
    >
      <Blob className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="absolute inset-0 z-10 flex flex-col px-12">
        {/* 기본 상태 (호버 X) */}
        <div
          className={`
            absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 pointer-events-none
            ${isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"}
          `}
        >
          <Logo name="primary" size={81} />
          <span className="font-[Knewave] text-display-large text-on-surface pb-2 leading-none">
            {PRE_TITLE[type]}
          </span>
        </div>

        {/* 상세 상태 (호버 O) */}
        <div
          className={`
            flex flex-col justify-center w-full h-full transition-opacity duration-300 pointer-events-none gap-6
            ${
              isActive
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto"
            }
          `}
        >
          <div className="flex items-center justify-center w-full gap-2">
            <Logo name={hoverLogoName} width={64} height={75} />
            <div className="flex flex-col items-start justify-center pt-1">
              <span className="font-[Knewave] text-display-medium text-on-surface leading-none">
                {PRE_TITLE[type]}
              </span>
              {metaText && (
                <p className="mt-2 label-large-emphasized text-on-surface">
                  {metaText}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onJoin?.(type);
              }}
              className="flex items-center gap-1 cursor-pointer hover:opacity-80 ml-10"
            >
              <span className="label-xxxlarge-emphasized text-on-surface">참여하기</span>
              <Icon name="arrow_right_double" size={24} />
            </button>
          </div>

          <div className="flex items-center justify-center">
            {safeTopic && (
              <div className="relative flex items-center justify-center">
                <Icon
                  name="topic"
                  className="text-primary"
                  width={320}
                  height={47}
                />
                <span className="absolute text-secondary label-xlarge-emphasized pb-1">
                  ‘{safeTopic}’
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card.Root>
  );
};

export default HeroChallengeCard;
