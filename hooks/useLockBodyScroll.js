// React imports
import { useEffect } from "react";

function getScrollbarWidth() {
  // Creating invisible container
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll"; // forcing scrollbar to appear
  outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement("div");
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}

// Locks the body when a component is mounted and unlocks it when it is unmounted.
const useLockBodyScroll = (open) => {
  useEffect(() => {
    const width = getScrollbarWidth();
    document.body.style.overflow = open ? "hidden" : "visible";
    document.body.style.paddingRight = open ? `${width}px` : "0px";
    return () => {
      document.body.style.overflow = "visible";
      document.body.style.paddingRight = "0px";
    };
  }, [open]);
};

export default useLockBodyScroll;
