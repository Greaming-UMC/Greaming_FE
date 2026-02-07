import { useEffect, useRef, useState } from 'react';

export const useHeaderScroll = (threshold: number = 0) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    if (!sentinelEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // sentinel이 화면에서 사라지면(스크롤 내리면) isScrolled = true
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold,
      }
    );

    observer.observe(sentinelEl);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { isScrolled, sentinelRef };
};