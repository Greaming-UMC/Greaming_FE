// Card 컴포넌트 
// Card.tsx에서 만든 'CardCompound' 객체를 여기서 'Card'라는 이름으로 바꿔서 내보냅니다.
// <Card.Root> 형태로 쓸 수 있습니다.
export { CardCompound as Card } from './Card';

// 타입들도 같이 내보내기 
export type { CardProps } from './Card';

//임포트 예시
//import { Card, Avatar, Divider } from '@/components/Display';