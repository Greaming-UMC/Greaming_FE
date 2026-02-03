import { useMemo, useState } from "react";
import type { Hashtag, OnboardingDraft, Purpose, Step } from "./types";

const DEFAULT: OnboardingDraft = {
  nickname: "",
  tags: [],
  purpose: null,
  weeklyGoal: null,
};

export function useOnboardingSteps() {
  const [step, setStep] = useState<Step>(1);
  const [draft, setDraft] = useState<OnboardingDraft>(DEFAULT);

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  const prev = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  const setNickname = (nickname: string) =>
    setDraft((d) => ({ ...d, nickname }));

  const toggleTag = (tag: Hashtag, max = 4) =>
    setDraft((d) => {
      const exists = d.tags.includes(tag);
      if (exists) return { ...d, tags: d.tags.filter((t) => t !== tag) };
      if (d.tags.length >= max) return d;
      return { ...d, tags: [...d.tags, tag] };
    });

  const setPurpose = (purpose: Purpose) =>
    setDraft((d) => ({ ...d, purpose }));

  const setWeeklyGoal = (weeklyGoal: number) =>
    setDraft((d) => ({ ...d, weeklyGoal }));

  const canNext = useMemo(() => {
    if (step === 1) return true;
    if (step === 2) return draft.nickname.trim().length >= 2;
    if (step === 3) return draft.tags.length >= 1;
    if (step === 4) return !!draft.purpose && !!draft.weeklyGoal;
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
    toggleTag,
    setPurpose,
    setWeeklyGoal,
  };
}
