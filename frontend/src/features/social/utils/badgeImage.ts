import type { UsagePurpose } from "../../../apis/types/common";

// 2. 매개변수 타입을 수정하세요.
export const getBadgeByLevel = (level: UsagePurpose): string => {
  const badgeMap: Record<UsagePurpose, string> = {
    SKETCHER: 'SKETCHER',
    PAINTER: 'PAINTER',
    ARTIST: 'ARTIST',
    MASTER: 'MASTER',
  };
  
  return badgeMap[level] || 'char_default';
};