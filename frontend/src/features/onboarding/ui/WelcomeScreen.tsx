import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/common/feedback/LoadingSpinner";
import { Button } from "../../../components/common/input/Button/Button";

// 로컬 svg 배경 import
import OnboardingBg from "../../../assets/background/onboarding_background.svg";

export function WelcomeScreen() {
  const navigate = useNavigate();

  const onStart = () => {
    navigate("/onboarding/step/1");
  };

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* 배경 이미지 (로컬 svg) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${OnboardingBg})` }}
      />

      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 z-10 bg-black/35" />

      {/* 좌상단 로고 */}
      <div className="absolute left-8 top-8 z-20 text-on-surface-variant-bright/90 label-medium-emphasized">
        Greaming
      </div>

      {/* 중앙 컨텐츠 */}
      <div className="relative z-50 flex min-h-dvh items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <LoadingSpinner size={128} className="text-white" iterations="infinite" />

          {/* 텍스트 블록 */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <h1 className="display-medium text-on-surface-variant-bright font-normal">
              Welcome to Greaming...
            </h1>

            <p className="sub-title-xlarge-emphasized text-on-surface-variant-bright">
              그림으로 소통하는 공간, 그리밍... 함께 여정을 걸으며 성장해봐요
            </p>
          </div>

          {/* 시작하기 버튼 */}
          <Button
            onClick={onStart}
            size="lg"
            shape="round"
            variant="surface"
            className="mt-8 w-31.25 px-2.5"
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
