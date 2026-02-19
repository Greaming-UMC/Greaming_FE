import type { HTMLAttributes, ReactNode } from "react";
import { Badge } from "./Badge";
import daily from "../../../assets/icon/multi/dailyChallenge.svg";
import weekly from "../../../assets/icon/multi/weekly.svg";


/* -------------------------------------------------------------------------- */
/* 1. Types & Interfaces                                                     */
/* -------------------------------------------------------------------------- */

type CardVariant = "elevated" | "filled" | "outlined";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** 카드의 스타일 타입 (기본: filled) */
  variant?: CardVariant;
  /** 클릭 가능 여부 (onClick이 있으면 자동 적용, 명시적으로 줄 때 true) */
  clickable?: boolean;
  /** 호버 시 둥둥 뜨는 애니메이션 사용 여부 (기본: true) */
  hoverEffect?: boolean;
  
}

/* -------------------------------------------------------------------------- */
/* 2. Main Component (Root)                                                  */
/* -------------------------------------------------------------------------- */

export const Card = ({
  children,
  variant = "filled",
  clickable = false,
  hoverEffect = false,
  className = "",
  onClick,
  ...props
}: CardProps) => {
  // GDS 토큰 매핑
  const variantStyles = {
    elevated: "bg-surface shadow-md border-transparent", // 온보딩, 중요 카드
    filled: "bg-surface-container-highest border-transparent", // 일반적인 배경 있는 카드
    outlined: "bg-transparent border border-outline", // 업로드 카드 등
  };

  const isInteractive = clickable || !!onClick;

  return (
    <article
      onClick={onClick}
      className={`
        /* 공통 레이아웃 */
        relative flex flex-col overflow-hidden transition-all duration-300
        rounded-[10px]
        
        /* 스타일 적용 */
        ${variantStyles[variant]}
        
        /* 인터랙션 (커서 및 호버 레이어) */
        ${isInteractive ? "cursor-pointer state-layer" : ""}
        
        /* 호버 애니메이션 (둥둥 뜨기) - hoverEffect가 켜져있을 때만 동작 */
        ${isInteractive && hoverEffect ? "hover:-translate-y-1" : ""}
        
        /* 커스텀 오버라이딩 (가장 마지막에 위치) */
        ${className}
      `}
      {...props}
    >
      {children}
    </article>
  );
};

/* -------------------------------------------------------------------------- */
/* 3. Sub Components (부속품)                                                */
/* -------------------------------------------------------------------------- */

// [Header] 제목, 프로필(Avatar), 메뉴 아이콘 배치
export const CardHeader = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex items-center justify-between p-4 pb-2 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// [Media] 이미지 영역 (Overlay를 자식으로 가질 수 있음)
interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  /** Tailwind Aspect Ratio 클래스 (예: aspect-video, aspect-square) */
  aspectRatio?: string;
  /** 뱃지 타입: 'weekly' | 'daily' | undefined */
  badge?: string | null;
  hoverEffect?: boolean;
}

export const CardMedia = ({
  src,
  alt,
  aspectRatio = "aspect-video",
  badge,
  className = "",
  children,
  hoverEffect = false,
  ...props
}: CardMediaProps) => {
  // 뱃지 타입에 따른 아이콘/색상 매핑

  const badgeMap: Record<string, string> = {
    daily: daily, // import daily from ...
    weekly: weekly, // import weekly from ...
  };

  // badge 프롭이 있으면 매핑된 이미지를 가져옴
  const currentBadgeSrc = (badge && badgeMap[badge]) || null;

  return (
    <div
      className={`
      relative w-full overflow-hidden bg-surface-variant group 
      ${aspectRatio} 
      ${className}
    `}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-transform duration-500 ${
          hoverEffect ? "group-hover:scale-105" : ""
        }`}
      />

      {/* 우측 상단 뱃지 렌더링 */}
      {currentBadgeSrc && (
        <div className="absolute top-3 right-3 z-20">
          {/* Badge 컴포넌트의 imgSrc 모드 사용 */}
          <Badge
            imgSrc={currentBadgeSrc}
            alt={`${badge} badge`} // 접근성 (예: "daily badge")
          />
        </div>
      )}
      {/* Overlay 컴포넌트가 들어갈 자리 */}
      {children}
    </div>
  );
};

// [Overlay] 미디어 위에 올라가는 호버 정보창 (그라데이션 포함)
export const CardOverlay = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`
      absolute z-10 flex flex-col justify-end p-4 bottom-0 left-0 w-full
      bg-[linear-gradient(0deg,#121315_0%,rgba(105,111,123,0.00)_97.39%)]
      opacity-0 group-hover:opacity-100 
      transition-opacity duration-300 ease-in-out
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

// [Body] 본문 텍스트 영역
export const CardBody = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex-1 ${className}`} {...props}>
    {children}
  </div>
);

// [Footer] 하단 액션 버튼, 태그 영역
export const CardFooter = ({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex items-center justify-between p-4 pt-0 ${className}`}
    {...props}
  >
    {children}
  </div>
);

/* -------------------------------------------------------------------------- */
/* 4. Export Compound Object (사용 편의성)                                   */
/* -------------------------------------------------------------------------- */

export const CardCompound = {
  Root: Card,
  Header: CardHeader,
  Media: CardMedia,
  Overlay: CardOverlay,
  Body: CardBody,
  Footer: CardFooter,
};
