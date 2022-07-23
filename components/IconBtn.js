const IconBtn = ({ children, className, onClick, roundedFull, disabled }) => {
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={onClick}
      className={`red-focus-ring ${roundedFull ? "rounded-full" : "rounded"}  ${
        className && className
      }`}
    >
      {children}
    </button>
  );
};

export default IconBtn;
