const BoltIcon = ({ className, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? size : "24"}
      viewBox="0 -960 960 960"
      className={className && className}
      width={size ? size : "24"}
    >
      <path d="m320-80 40-280H160l360-520h80l-40 320h240L400-80h-80Z" />
    </svg>
  );
};

export default BoltIcon;
