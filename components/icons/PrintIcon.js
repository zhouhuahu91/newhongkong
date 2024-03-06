const PrintIcon = ({ className, size, off }) => {
  if (off) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={size ? size : "24"}
        viewBox="0 -960 960 960"
        className={className && className}
        width={size ? size : "24"}
      >
        <path d="m791-55-71-71v6H240v-160H80v-240q0-51 35-85.5t85-34.5h6L55-791l57-57 736 736-57 57ZM320-200h320v-6L486-360H320v160Zm474-80L434-640h326q51 0 85.5 34.5T880-520v240h-86ZM640-680H394L234-840h486v160h-80Zm80 220q17 0 28.5-11.5T760-500q0-17-11.5-28.5T720-540q-17 0-28.5 11.5T680-500q0 17 11.5 28.5T720-460Z" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? size : "24"}
      viewBox="0 0 24 24"
      className={className && className}
      width={size ? size : "24"}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M19 8H5c-1.66 0-3 1.34-3 3v4c0 1.1.9 2 2 2h2v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h2c1.1 0 2-.9 2-2v-4c0-1.66-1.34-3-3-3zm-4 11H9c-.55 0-1-.45-1-1v-4h8v4c0 .55-.45 1-1 1zm4-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2-9H7c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1z" />
    </svg>
  );
};

export default PrintIcon;

<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24"
  viewBox="0 -960 960 960"
  width="24"
></svg>;
