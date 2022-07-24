const IconBtn = ({ children, className, onClick, roundedFull, disabled }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      className={`red-focus-ring ${roundedFull ? "rounded-full" : "rounded"}  ${
        className && className
      }`}
    >
      {children}
    </button>
  );
};

export default IconBtn;
