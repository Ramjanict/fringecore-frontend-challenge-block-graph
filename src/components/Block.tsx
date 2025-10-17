import React from "react";

interface BlockProps {
  id: number;
  x: number;
  y: number;
  onAdd: (parentId: number) => void;
  onDrag: (id: number, x: number, y: number) => void;
}

const Block: React.FC<BlockProps> = ({ id, x, y, onAdd, onDrag }) => {
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const newX = e.clientX - 50;
    const newY = e.clientY - 50;
    onDrag(id, newX, newY);
  };

  return (
    <div
      className="absolute bg-[#e5007d] w-32 h-32 text-white rounded flex flex-col justify-center items-center cursor-move"
      style={{ left: x, top: y }}
      onMouseDown={(e) => {
        e.preventDefault();
        const onMove = (moveEvent: MouseEvent) => {
          handleDrag({
            ...e,
            clientX: moveEvent.clientX,
            clientY: moveEvent.clientY,
          } as React.MouseEvent<HTMLDivElement>);
        };
        const onUp = () => {
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
        };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      }}
    >
      <span className="text-lg font-bold">{id}</span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAdd(id);
        }}
        className="mt-2 bg-pink-200 text-[#e5007d] px-4 py-1 rounded"
      >
        +
      </button>
    </div>
  );
};

export default Block;
