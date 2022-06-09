const getElementDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;
  const offsetLeft = ele.offsetLeft;

  return {
    height,
    offsetTop,
    offsetBottom,
    offsetLeft,
  };
};

export default getElementDimensions;
