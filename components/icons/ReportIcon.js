const ReportIcon = ({ className, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? size : "24"}
      viewBox="0 -960 960 960"
      className={className && className}
      width={size ? size : "24"}
    >
      <path d="M526-526v-314q123 15 210.5 103T840-526H526Zm-92 405q-137-17-226-119.5T119-480q0-137 89-239t226-121v719Zm92 0v-313h314q-15 124-103 212.5T526-121Z" />
    </svg>
  );
};

export default ReportIcon;
