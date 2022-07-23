const ChevronRightIcon = ({ color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height ? height : "24"}
      viewBox="0 0 24 24"
      width={width ? width : "24"}
      fill={color ? (color === "main" ? "#e76f51" : color) : "#374151"}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" />
    </svg>
  );
};

export default ChevronRightIcon;
