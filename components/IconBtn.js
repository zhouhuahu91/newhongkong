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
      className={`hover:scale-125 transition-transform red-focus-ring ${
        roundedFull ? "rounded-full" : "rounded"
      }  ${className && className}`}
    >
      {children}
    </button>
  );
};

export default IconBtn;
