import Paint from "../../../assets/icon/multi/draw.svg?react";
import OnboardingBg from "../../../assets/background/onboarding_background.svg";
import { LoginCard } from "./LoginCard";

export function LoginScreen() {
  // draw.svg 크기
  const FRAME_W = 995;
  const FRAME_H = 500;

  // 타이틀과 Paint 사이 간격
  const TITLE_GAP = 45;

  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* 배경 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${OnboardingBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-black/25" />
      {/*
      <div className="absolute inset-0 state-layer primary-opacity-16" />
      */}

      <div className="relative z-10 min-h-dvh flex items-center justify-center px-4">
        {/* 그룹 컨테이너: Paint 기준으로 고정 */}
        <div
          className="relative"
          style={{
            width: FRAME_W,
            height: FRAME_H + 52 + TITLE_GAP, // 52 = 타이틀 line-height 영역
          }}
        >
          <h1
            className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap display-medium text-on-primary"
            style={{
              top: 0,
            }}
          >
            Let&apos;s get start...!
          </h1>

          {/* Paint */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: `calc(var(--text-display-medium--line-height) + ${TITLE_GAP}px)`,
              width: FRAME_W,
              height: FRAME_H,
              pointerEvents: "none",
            }}
          >
            <Paint style={{ width: "100%", height: "100%" }} />
          </div>

          {/* 카드: Paint 위에서 고정 위치(중앙) */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: `calc(var(--text-display-medium--line-height) + ${TITLE_GAP}px)`,
              width: FRAME_W,
              height: FRAME_H,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="-translate-y-2.5">
              <LoginCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
