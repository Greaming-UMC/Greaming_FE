import { useMemo, useState } from "react";
import clsx from "clsx";

import type { ArtField, ArtStyle } from "../../../../apis/types/common";
import { ART_FIELD_LABEL, ART_STYLE_LABEL } from "../../../../apis/types/common";

import { Button } from "../../../../components/common/input/Button/Button";
import { OnboardingTagChip } from "../../../../components/common/display/OnboardingTagChip";
import { NicknameSection } from "../components/NickNameSection";
// 1. 훅 임포트
import { useOnboarding } from "../../hooks/useOnboarding";

type NicknameStatus = "unchecked" | "valid" | "invalid";

interface Props {
  nickname: string;
  onChangeNickname: (v: string) => void;
  tags: (ArtField | ArtStyle)[];
  onToggleTag: (tag: ArtField | ArtStyle) => void;
  onNext: () => void;
}

const MAX_FIELD = 4;
const FIELD_KEYS = Object.keys(ART_FIELD_LABEL) as ArtField[];
const STYLE_KEYS = Object.keys(ART_STYLE_LABEL) as ArtStyle[];

export function Step2Profile({
  nickname,
  onChangeNickname,
  tags,
  onToggleTag,
  onNext,
}: Props) {
  const { validateNickname } = useOnboarding();
  const [checkingNickname, setCheckingNickname] = useState(false);
  const [nicknameStatus, setNicknameStatus] = useState<NicknameStatus | undefined>(undefined);

  const handleNicknameChange = (v: string) => {
    onChangeNickname(v);
    setNicknameStatus("unchecked");
  };

  // 2. 중복 확인 시점 로그
  const handleCheckNickname = async () => {
    console.log("🔍 중복 확인 시작 - 닉네임:", nickname);
    if (!nickname.trim()) return;
    
    setCheckingNickname(true);
    
    try {
      const isAvailable = await validateNickname(nickname);
      
      // 🟢 API 결과 로그 확인 (Swagger 결과와 비교)
      console.log("🌐 API 응답 결과 (isAvailable):", isAvailable);
      
      const nextStatus = isAvailable ? "valid" : "invalid";
      console.log("✅ 결정된 닉네임 상태:", nextStatus);
      
      setNicknameStatus(nextStatus);
    } catch (err) {
      console.error("❌ 중복 확인 중 에러 발생:", err);
    } finally {
      setCheckingNickname(false);
    }
  };

  const selectedFields = tags.filter((tag) => tag in ART_FIELD_LABEL);
  const hasStyle = tags.some((tag) => tag in ART_STYLE_LABEL);
  const isFieldMax = selectedFields.length >= MAX_FIELD;

  const canNext = useMemo(() => {
    return (
      nickname.trim().length > 0 &&
      nicknameStatus === "valid" &&
      selectedFields.length >= 1 &&
      hasStyle
    );
  }, [nickname, nicknameStatus, selectedFields, hasStyle]);

  return (
    <div className="w-full flex flex-col items-center gap-[48px]">
      <h2 className="main-title-medium-emphasized text-on-surface text-center m-0">
        당신을 소개해주세요.
      </h2>

      <div className="w-[666px]">
        <NicknameSection
          value={nickname}
          status={nicknameStatus}
          onChange={handleNicknameChange}
          onCheck={handleCheckNickname}
          isChecking={checkingNickname}
        />
      </div>

      <div className="w-full flex flex-col gap-[16px]">
        <div className="sub-title-large-emphasized text-on-surface">내 특기 선택</div>

        <div className="w-full flex flex-col gap-[10px]">
          <div className="w-[666px] flex items-end justify-between">
            <div className="label-large-emphasized text-on-surface">분야</div>
            <div className="label-large text-on-surface-variant-lowest">최소 1개 최대 4개</div>
          </div>
          <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
            {FIELD_KEYS.map((key) => {
              const selected = tags.includes(key);
              return (
                <OnboardingTagChip
                  key={key}
                  label={`#${ART_FIELD_LABEL[key]}`}
                  selected={selected}
                  disabled={!selected && isFieldMax}
                  onClick={() => onToggleTag(key)}
                />
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col gap-[10px]">
          <div className="w-[666px] flex items-end justify-between">
            <div className="label-large-emphasized text-on-surface">스타일</div>
            <div className="label-large text-on-surface-variant-lowest">1개 선택</div>
          </div>
          <div className="w-[674px] -mx-[4px] grid grid-cols-6 gap-[10px]">
            {STYLE_KEYS.map((key) => {
              const selected = tags.includes(key);
              return (
                <OnboardingTagChip
                  key={key}
                  label={`#${ART_STYLE_LABEL[key]}`}
                  selected={selected}
                  // 스타일은 해제가 안 되므로 onClick에서 별도 분기 처리는 훅(toggleTag)이 담당
                  onClick={() => onToggleTag(key)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <Button
        size="2xl"
        variant={canNext ? "primary" : "surfaceVariant"}
        className={clsx("w-[666px]", !canNext && "bg-surface-variant-low")}
        onClick={onNext}
        disabled={!canNext}
      >
        다음
      </Button>
    </div>
  );
}