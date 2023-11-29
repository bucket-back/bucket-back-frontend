import { SEARCH_KEY } from '@/shared/constants';
import { Storage } from '@/shared/utils';

const searchLocalStorage = (keyword: string) => {
  const value = Storage.getLocalStoraged(SEARCH_KEY);
  if (!Array.isArray(value)) {
    Storage.setLocalStoraged(SEARCH_KEY, [keyword]);

    return;
  }
  const findValue = value.findIndex((value: string) => value === keyword);
  if (findValue === -1) {
    if (value.length >= 10) {
      const filterData = [keyword, ...value.slice(0, value.length - 1)];
      Storage.setLocalStoraged(SEARCH_KEY, [...filterData]);
    } else {
      Storage.setLocalStoraged(SEARCH_KEY, [keyword, ...value]);
    }
  } else {
    Storage.setLocalStoraged(SEARCH_KEY, [...value]);
  }
};

export default searchLocalStorage;
