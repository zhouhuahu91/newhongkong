const ChevronLeftIcon = ({ className, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? size : "24"}
      viewBox="0 0 24 24"
      className={className && className}
      width={size ? size : "24"}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
    </svg>
  );
};

export default ChevronLeftIcon;
