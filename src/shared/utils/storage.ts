const getLocalStoraged = (key: string) => {
  try {
    const value = localStorage.getItem(key);

    return value ? JSON.parse(value) : '';
  } catch (error) {
    throw new Error(error);
  }
};

const setLocalStoraged = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(error);
  }
};

const removeLocalStoraged = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    throw new Error(error);
  }
};

export default { getLocalStoraged, setLocalStoraged, removeLocalStoraged };
