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
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
    </svg>
  );
};

export default ChevronRightIcon;
