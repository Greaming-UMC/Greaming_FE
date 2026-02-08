import { useState } from "react";
import OnboardingBg from "../../../assets/background/onboarding_background.svg";

import { StepIndicator } from "./components/StepIndicator";
import { Step1Intro } from "./steps/Step1Intro";
import { Step2Profile } from "./steps/Step2Profile";
import { Step3Interests } from "./steps/Step3Interests";
import { Step4Purpose } from "./steps/Step4Purpose";

type Step = 1 | 2 | 3 | 4;

export function OnboardingSteps() {
  const [step, setStep] = useState<Step>(1);

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  const prev = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  // Step2
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [fieldTags, setFieldTags] = useState<string[]>([]);
  const [styleTag, setStyleTag] = useState<string | null>(null);

  // Step3
  const [interestFields, setInterestFields] = useState<string[]>([]);
  const [interestStyle, setInterestStyle] = useState<string | null>(null);

  // Step4
  const [journey, setJourney] = useState<
    "sketcher" | "painter" | "artist" | "master" | null
  >(null);
  const [weeklyGoal, setWeeklyGoal] = useState<number | null>(null);

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* Background (no inline style) */}
      <img
        src={OnboardingBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Main Content */}
      <div className="relative z-20 min-h-dvh flex items-center justify-center px-4">
        {/* 카드+indicator wrapper */}
        <div className="relative">
          {/* StepIndicator */}
          <div className="absolute left-1/2 -translate-x-1/2 z-30 top-[-72px]">
            <StepIndicator current={step} total={4} />
          </div>

          {/* White Box (공통 카드) */}
          <div
            className={[
              "rounded-[30px]",
              "bg-surface",
              "w-[min(762px,92vw)]",
              "h-[min(800px,92vh)]",
              "pt-15 pr-12 pb-18 pl-12",
              "box-border",
              "flex flex-col items-center",
            ].join(" ")}
          >
            {/* 본문 영역 */}
            <div className="w-full flex-1 flex flex-col">
              {step === 1 && <Step1Intro onNext={next} />}

              {step === 2 && (
                <Step2Profile
                  nickname={nickname}
                  onChangeNickname={setNickname}
                  intro={intro}
                  onChangeIntro={setIntro}
                  fieldTags={fieldTags}
                  onChangeFieldTags={setFieldTags}
                  styleTag={styleTag}
                  onChangeStyleTag={setStyleTag}
                  onPrev={prev}
                  onNext={next}
                />
              )}

              {step === 3 && (
                <Step3Interests
                  interestFields={interestFields}
                  onChangeInterestFields={setInterestFields}
                  interestStyle={interestStyle}
                  onChangeInterestStyle={setInterestStyle}
                  onPrev={prev}
                  onNext={next}
                />
              )}

              {step === 4 && (
                <Step4Purpose
                  onPrev={prev}
                  onSubmit={({ journey, weeklyGoal }) => {
                    setJourney(journey);
                    setWeeklyGoal(weeklyGoal);

                    console.log("STEP4 submit", {
                      nickname,
                      fieldTags,
                      styleTag,
                      interestFields,
                      interestStyle,
                      journey,
                      weeklyGoal,
                    });
                    // TODO: API 저장 + 라우팅
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
