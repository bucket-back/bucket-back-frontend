import { useEffect, useRef } from 'react';
import { InfiniteQueryObserverResult } from '@tanstack/react-query';

interface ObserverProps {
  fetchCallback: () => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean | undefined;
}

const useObserver = ({ fetchCallback, hasNextPage, isFetchingNextPage }: ObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entrie) => {
      if (entrie.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchCallback();
      }
    });
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(observerCallback);
    observer.observe(ref.current);

    return () => observer.unobserve(ref.current!);
  }, [ref]);

  return ref;
};

export default useObserver;
