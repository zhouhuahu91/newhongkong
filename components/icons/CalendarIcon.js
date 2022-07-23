const CalendarIcon = ({ color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height ? height : "24"}
      viewBox="0 0 24 24"
      width={width ? width : "24"}
      fill={color ? (color === "main" ? "#e76f51" : color) : "#374151"}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 3h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1H8V2c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1zM8 10h3c.55 0 1 .45 1 1v3c0 .55-.45 1-1 1H8c-.55 0-1-.45-1-1v-3c0-.55.45-1 1-1z" />
    </svg>
  );
};

export default CalendarIcon;
