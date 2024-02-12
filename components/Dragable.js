import { useState } from "react";

const Dragable = ({ children, position, setPosition }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tempPosition, setTempPosition] = useState(position);

  const onDragStart = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - tempPosition.x,
      y: e.clientY - tempPosition.y,
    });
  };

  const onDragging = (e) => {
    if (!isDragging) return;
    setTempPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const onDragEnd = () => {
    setIsDragging(false);
    setPosition(tempPosition);
  };

  return (
    <div
      style={{
        left: tempPosition.x + "px",
        top: tempPosition.y + "px",
        cursor: isDragging ? "grabbing" : "grab",
      }}
      className={`absolute`}
      onMouseDown={onDragStart}
      onMouseMove={onDragging}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd} // Consider adding this to handle edge cases
    >
      {children}
    </div>
  );
};

export default Dragable;
