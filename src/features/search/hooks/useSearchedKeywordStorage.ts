import { useState } from 'react';
import { Storage } from '@/shared/utils';

const useSearchedKeywordStorage = (
  key: string
): [string[] | [], (tempValue: string[] | []) => void] => {
  const [storageValue, setStorageValue] = useState<string[] | []>(Storage.getLocalStoraged(key));

  const setState = (tempValue: string[] | []) => {
    setStorageValue(tempValue);
    Storage.setLocalStoraged<string[] | []>(key, tempValue);
  };

  return [storageValue, setState];
};

export default useSearchedKeywordStorage;
