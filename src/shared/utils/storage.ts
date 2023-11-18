const getLocalStoraged = (key: string) => {
  try {
    const value = window.localStorage.getItem(key);

    return value ? JSON.parse(value) : '';
  } catch (error) {
    console.error(error);
  }
};

const setLocalStoraged = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export default { getLocalStoraged, setLocalStoraged };
