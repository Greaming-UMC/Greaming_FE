import { useMemo, useState } from "react";
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
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<UserInformations>(DEFAULT);

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  const prev = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

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

  // 🟢 return문에 빠진 함수들을 다 집어넣어야 에러가 안 납니다!
  return {
    step,
    draft,
    next,
    prev,
    setStep,
    canNext,
    setNickname,
    setIntro,      // 여기에 있어야 TS가 인식함
    toggleTag,
    setArtStyle,   // 추가
    setPurpose,
    setWeeklyGoal,
  };
}