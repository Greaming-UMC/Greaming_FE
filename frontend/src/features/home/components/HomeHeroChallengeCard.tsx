import { Card } from "../../../components/common";
import Logo from "../../../components/common/Logo";
import Icon from "../../../components/common/Icon";

import DailyBlob from "../../../assets/icon/multi/draw_secondary.svg?react";
// 제니퍼와 합의한 경로 (merge 되면 추가로 확인하겠습니당)
import WeeklyBlob from "../../../assets/icon/multi/draw.svg?react";

interface Props {
  type: "DAILY" | "WEEKLY";
  title: string;
  participantText?: string;
  timeLeftText?: string;
  topic?: string;
}

const HomeHeroChallengeCard = ({
  type,
  title,
  participantText,
  timeLeftText,
  topic,
}: Props) => {
  const isDaily = type === "DAILY";
  const Blob = isDaily ? DailyBlob : WeeklyBlob;
  const hoverLogoName = isDaily ? "mono-white" : "secondary";

  return (
    <Card.Root
      clickable
      className="relative w-[702px] h-[352px] bg-transparent overflow-visible group border-none shadow-none">
      <Blob className="absolute inset-0 w-full h-full pointer-events-none" />

      <div className="absolute inset-0 z-10 flex flex-col justify-center px-8">
        {/* 1. 기본 상태 (마우스 올리기 전) */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 transition-opacity duration-300 opacity-100 group-hover:opacity-0 pointer-events-none">
          <Logo name="primary" size={81} />
          <span className="font-[Knewave] text-[52px] text-on-surface pt-2 leading-none">
            {title}
          </span>
        </div>

        {/* 2. 호버 상태 (마우스 올렸을 때) */}
        <div className="flex flex-col w-full h-full justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex items-center justify-center gap-8 px-2">
            <div className="flex items-center gap-3">
              <Logo name={hoverLogoName} width={64} height={75} />
              <span className="font-[Knewave] text-4xl text-on-surface pt-1">
                {title}
              </span>
            </div>

            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-xl font-bold text-on-surface">
                참여하기
              </span>
              <Icon name="arrow_right_double" size={24} />
            </div>
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
                <span className="absolute text-sm font-bold text-secondary pb-1">
                  ‘{topic}’
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card.Root>
  );
};

export default HomeHeroChallengeCard;