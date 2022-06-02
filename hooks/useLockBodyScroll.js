// React imports
import { useEffect } from "react";

// Locks the body when a component is mounted and unlocks it when it is unmounted.
const useLockBodyScroll = (open) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "visible";
    return () => (document.body.style.overflow = "visible");
  }, [open]);
};

export default useLockBodyScroll;
