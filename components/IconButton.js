const IconButton = ({
  onClick,
  variant,
  color,
  size,
  disabled,
  className,
  filled,
}) => {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      type="button"
      className={`relative ring-offset-[4px] select-none w-4 h-4 red-focus-ring focus:outline-none ${
        className && className
      } rounded-full`}
    >
      <span
        className={`${
          filled ? "material-symbols-outlined" : "material-symbols-rounded"
        } ${
          disabled
            ? "text-gray-300 cursor-default"
            : color === "main"
            ? "text-main"
            : ""
        } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          size === "small" && "icon-small"
        }`}
      >
        {variant}
      </span>
    </button>
  );
};

export default IconButton;
