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
          <p className="sub-title-xlarge-emphasized text-on-surface m-0">
            그리고, 공유하고, 성장하는
            <br />
            그림 커뮤니티
          </p>

          <h1 className="main-title-large-emphasized text-on-surface mt-2">
            그리밍
          </h1>
        </div>
      </div>

      {/* 선 */}
      <div
        className="mx-auto bg-surface-variant-high"
        style={{
          width: 268,
          height: 2,
          borderRadius: 999,
          marginTop: 4,
          marginBottom: 14,
        }}
      />

      {/* SNS 영역 */}
      <div className="mt-6 flex flex-col items-center">
        <p className="label-large text-on-surface-variant-lowest text-center w-[180px] h-[17.3px]">
          SNS로 간편하게 시작하기
        </p>

        <div className="mt-4">
          <SocialLoginButtons />
        </div>
      </div>
    </div>
  );
}
