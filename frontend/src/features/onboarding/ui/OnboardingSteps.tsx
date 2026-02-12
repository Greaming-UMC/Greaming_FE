import type { ArtField, ArtStyle } from "../../../apis/types/common";
import OnboardingBg from "../../../assets/background/onboarding_background.svg";
import { useOnboardingSteps } from "../model/useOnboardingSteps";

import { StepIndicator } from "./components/StepIndicator";
import { Step1Welcome } from "./steps/Step1Welcome";
import { Step2Profile } from "./steps/Step2Profile";
import { Step3Interests } from "./steps/Step3Interests";
import { Step4Purpose } from "./steps/Step4Purpose";

export function OnboardingSteps() {
  const { 
    step, 
    draft, 
    next, 
    prev, 
    setNickname, 
    toggleTag, 
    setPurpose,   
    setWeeklyGoal  
  } = useOnboardingSteps();

  const INDICATOR_OFFSET_Y = -72;

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${OnboardingBg})` }} />
      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-20 min-h-dvh flex items-center justify-center px-4">
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 z-30" style={{ top: INDICATOR_OFFSET_Y }}>
            <StepIndicator current={step} total={4} />
          </div>

          <div className="rounded-[30px] bg-surface w-[min(762px,92vw)] h-[min(800px,92vh)] pt-15 pr-12 pb-18 pl-12 box-border flex flex-col items-center">
            <div className="w-full flex-1 flex flex-col">
              
              {step === 1 && <Step1Welcome onNext={next} />}

              {step === 2 && (
                <Step2Profile
                  nickname={draft.nickname}
                  onChangeNickname={setNickname}
                  // 🟢 specialtyTags 단일 배열 전달
                  tags={draft.specialtyTags as (ArtField | ArtStyle)[]}
                  onToggleTag={(tag) => toggleTag('specialtyTags', tag as ArtField)}
                  onNext={next}
                />
              )}

              {step === 3 && (
                <Step3Interests
                  // 🟢 단순 배열 하나만 넘기기 (타입 에러 방지를 위해 as 단언 사용)
                  tags={draft.interestTags as (ArtField | ArtStyle)[]}
                  onToggleTag={(tag) => toggleTag('interestTags', tag as ArtField)}
                  onPrev={prev}
                  onNext={next}
                />
              )}
              {step === 4 && (
                <Step4Purpose 
                  onPrev={prev} 
                  draft={draft}      
                  setPurpose={setPurpose}
                  setWeeklyGoal={setWeeklyGoal} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}