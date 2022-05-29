const SubmitButton = ({ processing, children }) => {
  return (
    <>
      {/* When processing we add an invisible div over the screen so that user can't interact with the screen */}
      {processing && <div className="absolute inset-0 z-50" />}
      <button
        type="submit"
        className={`button w-full text-white relative ${
          processing ? "pointer-events-none bg-gray-300" : "bg-main"
        }`}
        disabled={processing}
      >
        {/* When the submit is processing we show a spinner and disable the button. */}
        {processing && (
          <span className="material-symbols-rounded animate-spin text-white absolute right-4">
            refresh
          </span>
        )}
        {children}
      </button>
    </>
  );
};

export default SubmitButton;
