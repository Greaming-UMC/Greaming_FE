import { useMemo } from 'react';

/**
 * 날짜 포맷팅을 위한 커스텀 훅
 */
export const useDateFormatter = () => {
  return useMemo(() => ({
    /**
     * ISO 날짜를 한국어 포맷으로 변환
     * @param isoString - ISO 8601 형식의 날짜 문자열 (예: "2026-02-12T23:01:24")
     * @returns 한국어 형식 날짜 (예: "2026년02월12일 오후 11시")
     */
    formatKoreanDate: (isoString: string): string => {
      try {
        const date = new Date(isoString);
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = date.getHours();
        const period = hours < 12 ? '오전' : '오후';
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        
        return `${year}년${month}월${day}일 ${period} ${displayHours}시`;
      } catch (error) {
        console.error('날짜 포맷 오류:', error);
        return isoString;
      }
    },
  }), []);
};
