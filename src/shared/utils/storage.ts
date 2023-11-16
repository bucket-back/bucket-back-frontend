const getLocalStoraged = (key: string) => {
  try {
    const value = window.localStorage.getItem(key);

    return value ? JSON.stringify(value) : '';
  } catch (error) {
    console.error(error);
  }
};

const setLocalStoraged = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};

export default { getLocalStoraged, setLocalStoraged };
