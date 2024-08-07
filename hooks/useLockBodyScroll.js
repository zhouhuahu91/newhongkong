import { useEffect, useMemo } from "react";

function getScrollbarWidth() {
  if (typeof window === "undefined") return 0; // Ensure code only runs in the browser

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
  outer.remove();

  return scrollbarWidth;
}

const useLockBodyScroll = (open) => {
  // Memoize the scrollbar width, but ensure code only runs in the browser
  const scrollbarWidth = useMemo(
    () => (typeof window !== "undefined" ? getScrollbarWidth() : 0),
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure code only runs in the browser

    const originalStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.paddingRight = originalStyle.paddingRight;
    }

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.paddingRight = originalStyle.paddingRight;
    };
  }, [open, scrollbarWidth]);
};

export default useLockBodyScroll;
