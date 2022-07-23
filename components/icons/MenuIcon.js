const MenuIcon = ({ color, width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height ? height : "24"}
      viewBox="0 0 24 24"
      width={width ? width : "24"}
      fill={color ? (color === "main" ? "#e76f51" : color) : "#374151"}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
    </svg>
  );
};

export default MenuIcon;
