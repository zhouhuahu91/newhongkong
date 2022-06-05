// React imports
import { useState } from "react";

// Tooltip that shows a question mark with a short explanation when hovered.
const Tooltip = ({ children, tip, disabled }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      {show && (
        <div className="absolute left-1/2 bottom-7 text-xs text-white shadow-sm bg-main p-2 rounded -translate-x-1/2 w-56">
          {tip}
        </div>
      )}
      <div
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="flex"
      >
        {children ? (
          children
        ) : (
          <span
            className={`material-symbols-rounded text-lg ${
              disabled ? "text-gray-300" : ""
            }`}
          >
            help
          </span>
        )}
      </div>
    </div>
  );
};

export default Tooltip;
