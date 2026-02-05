import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../../components/common/feedback/LoadingSpinner";
import { Button } from "../../../components/common/input/Button/Button";

//  로컬 svg 배경 import
import OnboardingBg from "../../../assets/background/onboarding_background.svg";

export function WelcomeScreen() {
  const navigate = useNavigate();

  const onStart = () => {
    // 네가 지금 쓰는 구조에 맞게: OnboardingSteps 쪽으로 보내는 게 정석
    // Step1을 직접 라우팅으로 열고 싶으면 기존대로 "/onboarding/step1" 유지해도 됨
    navigate("/onboarding/step1");
    // navigate("/onboarding"); // (예: OnboardingSteps가 /onboarding 라우트라면 이걸로)
  };

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* 배경 이미지 (로컬 svg) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${OnboardingBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/*  반투명 오버레이 (원하는 만큼 조절) */}
      <div className="absolute inset-0 z-10 bg-black/35" />

      {/* 좌상단 로고 */}
      <div className="absolute left-8 top-8 z-20 text-white/90 text-sm font-semibold">
        Greaming
      </div>

      {/* 중앙 컨텐츠 */}
      <div className="relative z-20 flex min-h-dvh items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <LoadingSpinner size={116} className="text-white" />

          {/* 텍스트 블록 */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <h1
              className="text-center font-normal"
              style={{
                color: "var(--Schemes-On-Surface-Variant-Bright, #FCFCFC)",
                fontFamily: "var(--Static-Display-Medium-Font, 'Knewave')",
                fontSize: "var(--Static-Display-Medium-Size, 45px)",
                lineHeight: "var(--Static-Display-Medium-Line-Height, 52px)",
                letterSpacing: "var(--Static-Display-Medium-Tracking, 0)",
                margin: 0,
              }}
            >
              Welcome to Greaming...
            </h1>

            <p
              className="text-center"
              style={{
                color: "var(--Schemes-On-Surface-Variant-Bright, #FCFCFC)",
                fontFamily: "Pretendard",
                fontSize: "var(--Static-SubTitle-XLarge-Size, 20px)",
                lineHeight: "var(--Static-SubTitle-XLarge-Line-Height, 24px)",
                letterSpacing: "var(--Static-SubTitle-XLarge-Tracking, 0)",
                fontWeight: 600,
                margin: 0,
              }}
            >
              그림으로 소통하는 공간, 그리밍... 함께 여정을 걸으며 성장해봐요
            </p>
          </div>

          {/* 시작하기 버튼 */}
          <Button
            onClick={onStart}
            size="lg"
            shape="round"
            variant="surface"
            className="mt-8 w-[125px] px-[10px]"
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
}
