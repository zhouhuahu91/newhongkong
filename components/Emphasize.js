const Emp = ({ children, className }) => {
  return (
    <span className={`text-main font-medium whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
};

export default Emp;
