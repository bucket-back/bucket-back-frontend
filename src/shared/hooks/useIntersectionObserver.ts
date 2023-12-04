import { useCallback, useEffect, useRef } from 'react';

interface UseIntersectionObserverProps extends IntersectionObserverInit {
  onObserve: () => void;
}

const useIntersectionObserver = ({ onObserve, ...options }: UseIntersectionObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const callback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onObserve();
        }
      });
    },
    [onObserve]
  );

  useEffect(() => {
    const observedElement = ref.current;

    if (!observedElement) {
      return;
    }

    const observer = new IntersectionObserver(callback, options);

    observer.observe(observedElement);

    return () => {
      observer.unobserve(observedElement);
    };
  }, [callback, options]);

  return ref;
};

export default useIntersectionObserver;
