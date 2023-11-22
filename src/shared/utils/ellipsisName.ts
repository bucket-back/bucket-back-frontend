const ellipsisName = (name: string) => {
  if (name.length > 25) {
    return `${name.slice(0, 26)}...`;
  }

  return name;
};

export default ellipsisName;
