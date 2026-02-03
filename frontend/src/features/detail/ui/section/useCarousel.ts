import { useState, useCallback } from "react";

export const useCarousel = (itemCount: number, initialIndex = 0) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const prev = useCallback(() => {
    if (itemCount === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const next = useCallback(() => {
    if (itemCount === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
  }, [itemCount]);

  const goTo = useCallback(
    (index: number) => {
      if (itemCount === 0) return;
      if (index >= 0 && index < itemCount) {
        setCurrentIndex(index);
      }
    },
    [itemCount],
  );

  return {
    currentIndex,
    prev,
    next,
    goTo,
  };
};