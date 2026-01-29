// Card 컴포넌트
// Card.tsx에서 만든 'CardCompound' 객체를 여기서 'Card'라는 이름으로 바꿔서 내보냅니다.
// <Card.Root> 형태로 쓸 수 있습니다.
export { CardCompound as Card } from "./Card";

// 타입들도 같이 내보내기
export type { CardProps } from "./Card";

export { Avatar } from "./Avatar";
export type { AvatarProps } from "./Avatar";

export { Divider } from "./Divider";
export type { DividerProps } from "./Divider";

export { Badge } from "./Badge";
export type { BadgeProps } from "./Badge";

export { Chip } from "./Chip";
export type { ChipProps } from "./Chip";

export { EmptyState } from "./EmptyState";
export type { EmptyStateProps } from "./EmptyState";

export * from "./Counter"

//임포트 예시
//import { Card, Avatar, Divider } from '@/components/Display';
