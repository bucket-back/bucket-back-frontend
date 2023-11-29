const ellipsisName = (name: string, limit: number) => {
  if (name.length > limit) {
    return `${name.slice(0, limit + 1)}...`;
  }

  return name;
};

export default ellipsisName;
