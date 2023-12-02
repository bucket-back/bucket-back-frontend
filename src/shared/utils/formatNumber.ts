const formatNumber = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
};

export default formatNumber;
