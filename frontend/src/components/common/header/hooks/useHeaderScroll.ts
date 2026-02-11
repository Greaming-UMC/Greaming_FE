import { useEffect, useRef, useState } from 'react';

export const useHeaderScroll = (threshold: number = 0) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sentinelEl = sentinelRef.current;
    if (!sentinelEl) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(entry.boundingClientRect.top <= -threshold);
    });

    observer.observe(sentinelEl);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { isScrolled, sentinelRef };
};
