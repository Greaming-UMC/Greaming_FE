import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ART_FIELD_LABEL, ART_STYLE_LABEL, type ArtField, type ArtStyle, type UsagePurpose, type UserInformations } from "../../../apis/types/common";

export type Step = 1 | 2 | 3 | 4;

const DEFAULT: UserInformations = {
  nickname: "",
  profileImgUrl: "",
  introduction: "",
  journeyLevel: "SKETCHER",
  weeklyGoalScore: 0,
  specialtyTags: [], 
  interestTags: [],
  followerCount: 0,
  followingCount: 0,
};

export function useOnboardingSteps() {
  const { step: stepParam } = useParams<{ step?: string }>();
  const navigate = useNavigate();

  const step = useMemo<Step>(() => {
    const parsed = Number(stepParam);
    if (parsed >= 1 && parsed <= 4) {
      return parsed as Step;
    }
    return 1;
  }, [stepParam]);

  useEffect(() => {
    if (!stepParam || Number(stepParam) !== step) {
      navigate(`/onboarding/step/${step}`, { replace: true });
    }
  }, [navigate, step, stepParam]);

  const setStep = (target: Step) => {
    navigate(`/onboarding/step/${target}`);
  };
  const [draft, setDraft] = useState<UserInformations>(DEFAULT);

  const next = () => {
    const target = (step < 4 ? step + 1 : step) as Step;
    setStep(target);
  };
  const prev = () => {
    const target = (step > 1 ? step - 1 : step) as Step;
    setStep(target);
  };

  const setNickname = (nickname: string) =>
    setDraft((d) => ({ ...d, nickname }));

  // 🟢 1. 에러 해결을 위한 setIntro 추가
  const setIntro = (introduction: string) =>
    setDraft((d) => ({ ...d, introduction }));

  const toggleTag = (type: 'specialtyTags' | 'interestTags', tag: ArtField | ArtStyle, maxFields = 4) =>
  setDraft((d) => {
    const tags = d[type] || [];
    
    // 🟢 1. 스타일 태그인지 확인 (ART_STYLE_LABEL의 키 중 하나인지)
    const isStyleTag = tag in ART_STYLE_LABEL;

    if (isStyleTag) {
      if (tags.includes(tag)) return d;
      const otherTags = tags.filter((t) => !(t in ART_STYLE_LABEL));
      return { ...d, [type]: [...otherTags, tag] };
    }

    // 🟢 2. 분야 태그 로직: 기존 토글 방식 유지하되 최대 개수 제한
    const exists = tags.includes(tag);
    const fieldCount = tags.filter((t) => t in ART_FIELD_LABEL).length;

    if (!exists && fieldCount >= maxFields) {
      return d; // 최대 개수 도달 시 변화 없음
    }

    const newTags = exists 
      ? tags.filter((t) => t !== tag) 
      : [...tags, tag];

    return { ...d, [type]: newTags };
  });

  const setPurpose = (journeyLevel: UsagePurpose) => setDraft((d) => ({ ...d, journeyLevel }));

  const setWeeklyGoal = (weeklyGoalScore: number) =>
    setDraft((d) => ({ ...d, weeklyGoalScore }));

  const canNext = useMemo(() => {
    if (step === 1) return true;
    if (step === 2) return draft.nickname.trim().length >= 2 && draft.specialtyTags.length >= 1;
    if (step === 3) return draft.interestTags.length >= 1;
    if (step === 4) return !!draft.journeyLevel && (draft.weeklyGoalScore ?? 0) > 0;
    return true;
  }, [step, draft]);

 
  return {
    step,
    draft,
    next,
    prev,
    setStep,
    canNext,
    setNickname,
    setIntro,      
    toggleTag,   
    setPurpose,
    setWeeklyGoal,
  };
}
