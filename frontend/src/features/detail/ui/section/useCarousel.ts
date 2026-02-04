import { useState, useCallback } from "react";

/**
 * 이미지 캐러셀을 위한 커스텀 훅
 * @param length 캐러셀 아이템의 총 개수
 */
export const useCarousel = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * 이전 아이템으로 이동합니다. 첫 번째 아이템에서는 동작하지 않습니다.
   */
  const prev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  /**
   * 다음 아이템으로 이동합니다. 마지막 아이템에서는 동작하지 않습니다.
   */
  const next = useCallback(() => {
    if (currentIndex < length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, length]);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < length) {
      setCurrentIndex(index);
    }
  }, [length]);

  return { currentIndex, prev, next, goTo };
};