import React from "react";

type Props = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export function IntroFeatureCard({ icon, title, description }: Props) {
  return (
    <div
      className="
        flex flex-col items-start gap-[10px]
        rounded-[10px]
        w-[325px] h-[185px]
        px-[27px] py-[30px]
        bg-surface-variant-high
      "
    >
      {/* 아이콘 */}
      <div className="w-full flex justify-center">{icon}</div>

      {/* 텍스트(타이틀/설명) */}
      <div className="w-full flex flex-col items-center gap-[6px]">
        <h3 className="sub-title-large-emphasized text-on-surface text-center m-0">
          {title}
        </h3>

        <p className="body-large-emphasized text-on-surface-variant-lowest text-center m-0 w-[295px] leading-[20px]">
          {description}
        </p>
      </div>
    </div>
  );
}
