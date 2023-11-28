import { useEffect, useState } from 'react';

const useDebounce = (value: string[], delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value[0]);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
};

export default useDebounce;
