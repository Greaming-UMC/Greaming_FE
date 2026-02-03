import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function IntroFeatureCard({ icon, title, description }: Props) {
  return (
    <div
      className="flex flex-col items-start gap-[10px] rounded-[10px]"
      style={{
        width: 325,
        height: 185,
        padding: "30px 27px",
        background: "var(--Schemes-On-Surface-Variant-High-2, #F3F3F3)",
      }}
    >
      {/* 아이콘 */}
      <div className="w-full flex justify-center">{icon}</div>

      {/* 텍스트(타이틀/설명) */}
      <div className="w-full flex flex-col items-center gap-[6px]">
        <h3
          className="text-center"
          style={{
            color: "var(--Schemes-On-Surface, #121315)",
            fontFamily: "Pretendard",
            fontSize: "var(--Static-SubTitle-Large-Size, 18px)",
            fontWeight: 600,
            fontStyle: "normal",
            lineHeight: "var(--Static-SubTitle-Large-Line-Height, 20px)",
            letterSpacing: "var(--Static-SubTitle-Large-Tracking, 0.15px)",
            margin: 0,
          }}
        >
          {title}
        </h3>

        <p
          className="text-center"
          style={{
            width: 295,
            color: "var(--Schemes-On-Surface-Variant-Lowest, #858586)",
            fontFamily: "var(--Static-Body-Large-Font, Pretendard)",
            fontSize: "var(--Static-Body-Large-Size, 16px)",
            fontWeight: 500,
            fontStyle: "normal",
            lineHeight: "var(--Static-Body-Large-Line-Height, 20px)",
            letterSpacing: "var(--Static-Body-Large-Tracking, 0)",
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
