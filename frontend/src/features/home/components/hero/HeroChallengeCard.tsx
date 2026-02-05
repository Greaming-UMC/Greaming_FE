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
  topic?: string;
  onJoin?: (type: "DAILY" | "WEEKLY") => void;
  isActive?: boolean;
}

const HeroChallengeCard = ({
  type,
  title,
  participantText,
  timeLeftText,
  topic,
  onJoin,
  isActive = false,
}: Props) => {
  const isDaily = type === "DAILY";
  const Blob = isDaily ? DailyBlob : WeeklyBlob;
  const hoverLogoName = isDaily ? "mono-white" : "secondary";

  return (
    <Card.Root
      clickable={!isActive}
      className="relative w-[702px] h-[352px] bg-transparent overflow-visible group border-none shadow-none"
    >
      <Blob className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8">
        <div
          className={`
            absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 pointer-events-none
            ${isActive ? "opacity-0" : "opacity-100 group-hover:opacity-0"}
          `}
        >
          <Logo name="primary" size={81} />
          <span className="font-[Knewave] text-[52px] text-on-surface pt-2 leading-none">
            {title}
          </span>
        </div>

        <div
          className={`
            flex flex-col w-full h-full justify-center transition-opacity duration-300 pointer-events-none
            ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto"}
          `}
        >
          <div className="flex items-center justify-center gap-8 px-2">
            <div className="flex items-center gap-3">
              <Logo name={hoverLogoName} width={64} height={75} />
              <span className="font-[Knewave] text-4xl text-on-surface pt-1">{title}</span>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onJoin?.(type);
              }}
              className="flex items-center gap-1 cursor-pointer hover:opacity-80"
            >
              <span className="text-xl font-bold text-on-surface">참여하기</span>
              <Icon name="arrow_right_double" size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center gap-3 mt-1">
            {(participantText || timeLeftText) && (
              <p className="text-sm font-semibold text-on-surface">
                {participantText} {timeLeftText}
              </p>
            )}

            {topic && (
              <div className="relative flex items-center justify-center">
                <Icon name="topic" className="text-primary" width={320} height={47} />
                <span className="absolute text-sm font-bold text-secondary pb-1">‘{topic}’</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card.Root>
  );
};

export default HeroChallengeCard;
