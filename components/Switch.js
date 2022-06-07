const Switch = ({ toggle, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        toggle && "bg-main"
      } relative inline-flex flex-shrink-0 h-[18px] w-[30px] border rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-opacity-75`}
    >
      <span
        className={`${toggle ? "translate-x-[12px]" : "translate-x-0"}
            pointer-events-none inline-block h-[16px] w-[16px] rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
      />
    </button>
  );
};

export default Switch;
