const IconBtn = ({ children, className, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`red-focus-ring rounded ${className && className}`}
    >
      {children}
    </button>
  );
};

export default IconBtn;
