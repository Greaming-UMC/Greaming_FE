import type { UsagePurpose } from "../../../apis/types/common";

// 2. 매개변수 타입을 수정하세요.
export const getBadgeByLevel = (level: UsagePurpose): string => {
  const badgeMap: Record<UsagePurpose, string> = {
    SKETCHER: 'badge_sketcher',
    PAINTER: 'badge_painter',
    ARTIST: 'badge_artist',
    MASTER: 'badge_master',
  };
  
  return badgeMap[level] || 'badge_default';
};