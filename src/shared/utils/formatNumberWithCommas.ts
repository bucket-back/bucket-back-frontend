const formatNumberWithCommas = (price: number) => {
  if (price >= 1000) {
    const temp = String(price);
    const lastCount = temp.slice(-3);
    const firstCount = temp.slice(0, temp.length - 3);

    return `${firstCount},${lastCount}`;
  }

  return String(price);
};
export default formatNumberWithCommas;
