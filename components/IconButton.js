const IconButton = ({ onClick, variant, color, size, disabled, className }) => {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      type="button"
      className={`relative w-4 h-4 ${className && className}`}
    >
      <span
        className={`material-symbols-rounded ${
          disabled
            ? "text-gray-300 cursor-default"
            : color === "main"
            ? "text-main"
            : ""
        } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          size === "small" ? "text-lg" : ""
        }`}
      >
        {variant}
      </span>
    </button>
  );
};

export default IconButton;
