import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ArtField, UsagePurpose, UserInformations } from "../../../apis/types/common";

export type Step = 1 | 2 | 3 | 4;

const DEFAULT: UserInformations = {
  nickname: "",
  profileImgUrl: "",
  intro: "",
  usagePurpose: "SKETCHER",
  weeklyGoalScore: 0,
  specialties: { fields: [], style: "" },
  interests: { fields: [], style: "" },
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
  const setIntro = (intro: string) =>
    setDraft((d) => ({ ...d, intro }));

  // 🟢 2. specialties와 interests를 구분해서 토글할 수 있게 수정
  const toggleTag = (type: 'specialties' | 'interests', tag: ArtField, max = 4) =>
    setDraft((d) => {
      const { fields } = d[type];
      const exists = fields.includes(tag);
      const newFields = exists 
        ? fields.filter((t) => t !== tag) 
        : fields.length < max ? [...fields, tag] : fields;

      return { 
        ...d, 
        [type]: { ...d[type], fields: newFields } 
      };
    });

  // 🟢 3. 스타일(style) 설정 함수 (Step 2, 3에서 필요)
  const setArtStyle = (type: 'specialties' | 'interests', style: string) =>
    setDraft((d) => ({
      ...d,
      [type]: { ...d[type], style }
    }));

  const setPurpose = (usagePurpose: UsagePurpose) =>
    setDraft((d) => ({ ...d, usagePurpose }));

  const setWeeklyGoal = (weeklyGoalScore: number) =>
    setDraft((d) => ({ ...d, weeklyGoalScore }));

  const canNext = useMemo(() => {
    if (step === 1) return true;
    if (step === 2) return draft.nickname.trim().length >= 2 && draft.specialties.fields.length >= 1 && !!draft.specialties.style;
    if (step === 3) return draft.interests.fields.length >= 1 && !!draft.interests.style;
    if (step === 4) return !!draft.usagePurpose && draft.weeklyGoalScore > 0;
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
    setArtStyle,   
    setPurpose,
    setWeeklyGoal,
  };
}
