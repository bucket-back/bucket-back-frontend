const getLocalStoraged = (key: string) => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : '';
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

const setLocalStoraged = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

const removeLocalStoraged = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
};

export default { getLocalStoraged, setLocalStoraged, removeLocalStoraged };
