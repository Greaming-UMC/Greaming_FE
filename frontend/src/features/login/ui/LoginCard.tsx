import Logo from "../../../assets/logo/primary.svg?react";
import { SocialLoginButtons } from "./SocialLoginButtons";

export function LoginCard() {
  return (
    <div className="w-[520px]">
      {/* 상단: 로고 + 텍스트 */}
      <div className="flex items-center justify-center gap-8">
        <div
          className="flex items-center justify-center"
          style={{ width: 131, height: 131 }}
        >
          <Logo width={131} height={131} />
        </div>

        <div className="text-left">
          <p
            style={{
              fontFamily: "Pretendard",
              fontWeight: 600,
              fontSize: "var(--Static-SubTitle-XLarge-Size, 20px)",
              lineHeight: "var(--Static-SubTitle-XLarge-Line-Height, 24px)",
              letterSpacing: "var(--Static-SubTitle-XLarge-Tracking, 0)",
              color: "var(--Grayscale-Grayscale1, #121315)",
              margin: 0,
            }}
          >
            그리고, 공유하고, 성장하는
            <br />
            그림 커뮤니티
          </p>

          <h1
            style={{
              marginTop: 8,
              fontFamily: "Pretendard",
              fontWeight: 700,
              fontSize: "var(--Static-Headline-Large-Size, 32px)",
              lineHeight: "var(--Static-Headline-Large-Line-Height, 39px)",
              color: "var(--Schemes-On-Surface, #121315)",
            }}
          >
            그리밍
          </h1>
        </div>
      </div>


        {/* 선     */}
        <div
        className="mx-auto"
        style={{
            width: 268,
            height: 2,
            borderRadius: 999,
            backgroundColor: "var(--Schemes-On-Surface-Variant-High-2, #F3F3F3)",
            marginTop: 4,
            marginBottom: 14,
        }}
        />

      {/* SNS 영역 */}
      <div className="mt-6 flex flex-col items-center">
        <p
          style={{
            width: 180,
            height: 17.3,
            fontFamily: "Pretendard",
            fontWeight: 500,
            fontSize: "var(--Static-Label-Large-Size, 14px)",
            lineHeight: "var(--Static-Label-Large-Line-Height, 20px)",
            letterSpacing: "var(--Static-Label-Large-Tracking, 0.1px)",
            color:
              "var(--Schemes-On-Surface-Variant-Lowest, rgba(0,0,0,0.4))",
            textAlign: "center",
          }}
        >
          SNS로 간편하게 시작하기
        </p>

        <div className="mt-4">
          <SocialLoginButtons />
        </div>
      </div>
    </div>
  );
}