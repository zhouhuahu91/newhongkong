import { useState } from "react";

const Dragable = ({ children, position, setPosition, onClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tempPosition, setTempPosition] = useState(position);
  const [hasMoved, setHasMoved] = useState(false); // To distinguish click from drag

  const onDragStart = (e) => {
    setIsDragging(true);
    setHasMoved(false); // Initially, mouse hasn't moved, so it might be a click
    setDragStart({
      x: e.clientX - tempPosition.x,
      y: e.clientY - tempPosition.y,
    });
  };

  const onDragging = (e) => {
    if (!isDragging) return;
    setHasMoved(true); // If this event fires, the mouse has moved, so it's a drag
    setTempPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const onDragEnd = () => {
    setIsDragging(false);
    if (!hasMoved) {
      onClick();
    } else {
      setPosition(tempPosition);
    }
  };

  return (
    <div
      style={{
        left: tempPosition.x + "px",
        top: tempPosition.y + "px",
      }}
      className={`absolute cursor-pointer`}
      onMouseDown={onDragStart}
      onMouseMove={onDragging}
      onMouseUp={onDragEnd}
    >
      {children}
    </div>
  );
};

export default Dragable;
