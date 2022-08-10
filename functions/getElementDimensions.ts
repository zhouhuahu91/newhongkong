type getElementDimensionsType = (ele: HTMLElement) => {
  height: number;
  offsetTop: number;
  offsetBottom: number;
  offsetLeft: number;
};

const getElementDimensions: getElementDimensionsType = (ele) => {
  const { height }: { height: number } = ele.getBoundingClientRect();
  const offsetTop: number = ele.offsetTop;
  const offsetBottom: number = offsetTop + height;
  const offsetLeft: number = ele.offsetLeft;
  return {
    height,
    offsetTop,
    offsetBottom,
    offsetLeft,
  };
};

export default getElementDimensions;
