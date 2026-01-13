/**
 * 💳 [Card] 공통 컴포넌트 (Compound Component Pattern)
 *
 * @description
 * GDS 디자인 시스템을 준수하며, 다양한 형태(포스팅, 챌린지, 업로드 등)를 
 * 유연하게 구현하기 위해 '합성 컴포넌트' 패턴으로 설계되었습니다.
 * * @subcomponents
 * - Card.Root:    최상위 컨테이너 (배경, 테두리, 그림자, 클릭 이벤트 담당)
 * - Card.Header:  상단 영역 (제목, 아바타, 메뉴 아이콘 등)
 * - Card.Media:   이미지/비디오 영역 (aspect-ratio 지원, hover group trigger)
 * - Card.Overlay: Media 위에 올라가는 호버 시 등장 레이어 (그라데이션 포함)
 * - Card.Body:    본문 텍스트 영역 (padding 포함)
 * - Card.Footer:  하단 액션 버튼, 태그, 부가 정보 영역
 *
 * @usage
 * ```tsx
 * // 1. 기본 텍스트 카드 (variant: filled | elevated | outlined)
 * <Card.Root variant="elevated">
 * <Card.Header>
 * <h3 className="label-large">공지사항</h3>
 * </Card.Header>
 * <Card.Body>카드 내용입니다.</Card.Body>
 * </Card.Root>
 *
 * // 2. 포스팅 카드 (이미지 + 호버 오버레이 + 하단 정보)
 * <Card.Root className="bg-transparent shadow-none border-none" hoverEffect={true}>
 * <Card.Media src="image.jpg" aspectRatio="aspect-square">
 * <Card.Overlay className="items-end pb-3 pr-3">
 * <span className="text-white font-bold">#Overlay Text</span>
 * </Card.Overlay>
 * </Card.Media>
 * <Card.Footer className="px-0">
 * <Avatar size="sm" />
 * <span>좋아요 10</span>
 * </Card.Footer>
 * </Card.Root>
 *
 * // 3. 클릭 가능한 카드 (자동으로 커서 변경 및 호버 애니메이션 적용)
 * <Card.Root onClick={() => console.log('Click!')}>
 * <Card.Body>나를 클릭해봐</Card.Body>
 * </Card.Root>
 * ```
 */


import type { HTMLAttributes, ReactNode } from 'react';

/* -------------------------------------------------------------------------- */
/* 1. Types & Interfaces                                                     */
/* -------------------------------------------------------------------------- */

type CardVariant = 'elevated' | 'filled' | 'outlined';

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
  variant = 'filled',
  clickable = false,
  hoverEffect = false,
  className = '',
  onClick,
  ...props
}: CardProps) => {
  // GDS 토큰 매핑 
  const variantStyles = {
    elevated: 'bg-surface shadow-md border-transparent', // 온보딩, 중요 카드
    filled: 'bg-surface-container-highest border-transparent', // 일반적인 배경 있는 카드
    outlined: 'bg-transparent border border-outline', // 업로드 카드 등
  };

  const isInteractive = clickable || !!onClick;

  return (
    <article
      onClick={onClick}
      className={`
        /* 공통 레이아웃 */
        relative flex flex-col overflow-hidden transition-all duration-300
        rounded-medium
        
        /* 스타일 적용 */
        ${variantStyles[variant]}
        
        /* 인터랙션 (커서 및 호버 레이어) */
        ${isInteractive ? 'cursor-pointer state-layer' : ''}
        
        /* 호버 애니메이션 (둥둥 뜨기) - hoverEffect가 켜져있을 때만 동작 */
        ${isInteractive && hoverEffect ? 'hover:-translate-y-1' : ''}
        
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
export const CardHeader = ({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex items-center justify-between p-4 pb-2 ${className}`} {...props}>
    {children}
  </div>
);

// [Media] 이미지 영역 (Overlay를 자식으로 가질 수 있음)
interface CardMediaProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  /** Tailwind Aspect Ratio 클래스 (예: aspect-video, aspect-square) */
  aspectRatio?: string;
}

export const CardMedia = ({ 
  src, 
  alt, 
  aspectRatio = 'aspect-video', 
  className = '', 
  children, 
  ...props 
}: CardMediaProps) => (
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
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
    />
    {/* Overlay 컴포넌트가 들어갈 자리 */}
    {children}
  </div>
);

// [Overlay] 미디어 위에 올라가는 호버 정보창 (그라데이션 포함)
export const CardOverlay = ({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div 
    className={`
      absolute inset-0 z-10 flex flex-col justify-end p-4
      bg-gradient-to-t from-black/80 via-black/20 to-transparent
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
export const CardBody = ({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex-1 p-4 ${className}`} {...props}>
    {children}
  </div>
);

// [Footer] 하단 액션 버튼, 태그 영역
export const CardFooter = ({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex items-center justify-between p-4 pt-0 ${className}`} {...props}>
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
