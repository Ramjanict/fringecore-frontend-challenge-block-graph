import React from "react";

interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  parentWidth?: number;
  parentHeight?: number;
  childWidth?: number;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  parentWidth = 128,
  parentHeight = 128,
  childWidth = 128,
}) => {
  const startX = x1 + parentWidth / 2;
  const startY = y1 + parentHeight + 4; 


  const endX = x2 + childWidth / 2;
  const endY = y2 - 4;

  const midY = (startY + endY) / 2;

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <polyline
        points={`${startX},${startY} ${startX},${midY} ${endX},${midY} ${endX},${endY}`}
        stroke="black"
        strokeWidth={1.5}
        fill="none"
        strokeDasharray="5,5"
      />
    </svg>
  );
};

export default ConnectionLine;
