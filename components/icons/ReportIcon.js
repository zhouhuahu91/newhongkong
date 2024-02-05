const ReportIcon = ({ className, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? size : "24"}
      viewBox="0 0 24 24"
      className={className && className}
      width={size ? size : "24"}
    >
      <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
    </svg>
  );
};

export default ReportIcon;
