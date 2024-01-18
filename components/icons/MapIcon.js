const MapIcon = ({ className, size }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size ? size : "24"}
      viewBox="0 -960 960 960"
      className={className && className}
      width={size ? size : "24"}
    >
      <path d="m600-120-240-84-240 93v-647l240-82 240 84 240-93v647l-240 82Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z" />
    </svg>
  );
};

export default MapIcon;
