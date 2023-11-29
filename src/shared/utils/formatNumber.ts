const formatNumber = (price: number) => {
  if (price >= 1000) {
    const temp = String(price);
    const lastCount = temp.slice(-3);
    const firstCount = temp.slice(0, temp.length - 3);

    return `${firstCount},${lastCount} 원`;
  }

  return String(price);
};
export default formatNumber;
