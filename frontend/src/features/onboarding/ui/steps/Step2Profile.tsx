import { useMemo, useState } from "react";
import clsx from "clsx";

import type { ArtField, ArtStyle } from "../../../../apis/types/common";
import { ART_FIELD_LABEL, ART_STYLE_LABEL } from "../../../../apis/types/common";

import { Button } from "../../../../components/common/input/Button/Button";
import { OnboardingTagChip } from "../../../../components/common/display/OnboardingTagChip";
import { NicknameSection } from "../components/NickNameSection";

type NicknameStatus = "unchecked" | "valid" | "invalid";

interface Props {
  nickname: string;
  onChangeNickname: (v: string) => void;
  fieldTags: ArtField[];
  onChangeFieldTags: (tag: ArtField) => void; // 부모의 toggleTag와 연결
  styleTag: ArtStyle | null;
  onChangeStyleTag: (style: ArtStyle) => void; // 부모의 setArtStyle와 연결
  onNext: () => void;
}

const MAX_FIELD = 4;
const FIELD_KEYS = Object.keys(ART_FIELD_LABEL) as ArtField[];
const STYLE_KEYS = Object.keys(ART_STYLE_LABEL) as ArtStyle[];

export function Step2Profile({
  nickname,
  onChangeNickname,
  fieldTags,
  onChangeFieldTags,
  styleTag,
  onChangeStyleTag,
  onNext,
}: Props) {
  const [checkingNickname, setCheckingNickname] = useState(false);
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus | undefined>(undefined);

  // 닉네임 변경 시 상태 초기화
  const handleNicknameChange = (v: string) => {
    onChangeNickname(v);
    setNicknameStatus("unchecked");
  };

  // 닉네임 중복 확인 (임시 시뮬레이션 유지하되 깔끔하게 정리)
  const handleCheckNickname = async () => {
    if (!nickname.trim()) return;
    setCheckingNickname(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const isAvailable = !["admin", "test", "중복"].includes(nickname.trim());
    setNicknameStatus(isAvailable ? "valid" : "invalid");
    setCheckingNickname(false);
  };

  // 다음 버튼 활성화 조건
      const canNext = useMemo(() => {
      const hasNickname = nickname.trim().length > 0;
      const nicknameOk = nicknameStatus === "valid";

      const hasField = fieldTags.length >= 1;

      const hasStyle = styleTag !== null && STYLE_KEYS.includes(styleTag);

      return hasNickname && nicknameOk && hasField && hasStyle;
    }, [nickname, nicknameStatus, fieldTags, styleTag]);

      return (
  <div className="w-full flex flex-col items-center">
    {/* 컨텐츠 컬럼 */}
    <div className="w-[666px] pt-[14px] pb-[72px]">
      <h2 className="main-title-medium-emphasized text-on-surface text-center m-0 mb-[48px]">
        당신을 소개해주세요.
      </h2>

      {/* 닉네임 */}
      <div className="mb-[48px]">
        <NicknameSection
          value={nickname}
          status={nicknameStatus}
          onChange={handleNicknameChange}
          onCheck={handleCheckNickname}
          isChecking={checkingNickname}
        />
      </div>

      {/* 내 특기 선택 */}
      <div className="flex flex-col gap-[16px] mb-[88px]">
        <div className="sub-title-large-emphasized text-on-surface">내 특기 선택</div>

        {/* 분야 */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-end justify-between">
            <div className="label-large-emphasized text-on-surface">분야</div>
            <div className="label-xlarge text-on-surface-variant-lowest">최소 1개 최대 4개</div>
          </div>

          <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
            {FIELD_KEYS.map((key) => {
              const selected = fieldTags.includes(key);
              const disabled = !selected && fieldTags.length >= MAX_FIELD;
              return (
                <OnboardingTagChip
                  key={key}
                  label={`#${ART_FIELD_LABEL[key]}`}
                  selected={selected}
                  disabled={disabled}
                  onClick={() => !disabled && onChangeFieldTags(key)}
                />
              );
            })}
          </div>
        </div>

        {/* 스타일 */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-end justify-between">
            <div className="label-large-emphasized text-on-surface">스타일</div>
            <div className="label-xlarge text-on-surface-variant-lowest">1개 선택</div>
          </div>

          <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
            {STYLE_KEYS.map((key) => (
              <OnboardingTagChip
                key={key}
                label={`#${ART_STYLE_LABEL[key]}`}
                selected={styleTag === key}
                onClick={() => onChangeStyleTag(key)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <Button
        size="2xl"
        variant={canNext ? "primary" : "surfaceVariant"}
        className={clsx("w-full", !canNext && "bg-surface-variant-low")}
        onClick={onNext}
        disabled={!canNext}
      >
        다음
      </Button>
    </div>
  </div>
);

}