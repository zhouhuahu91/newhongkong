const Spinner = ({ size }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div
        className={`rounded-full border-white border-t-main animate-spin ${
          size === "small" ? "w-8 h-8 border-2" : "w-16 h-16 border-4"
        }`}
      />
    </div>
  );
};

export default Spinner;
