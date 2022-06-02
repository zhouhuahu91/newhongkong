const IconButton = ({ onClick, variant, color }) => {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      type="button"
      className="relative"
    >
      <span
        className={`material-symbols-rounded ${
          color === "main" && "text-main"
        } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
      >
        {variant}
      </span>
    </button>
  );
};

export default IconButton;
