"use client";
import React, { useState } from "react";
import Block from "./Block";
import ConnectionLine from "./ConnectionLines";

interface BlockType {
  id: number;
  x: number;
  y: number;
  parentId?: number;
}

const getRandomPosition = () => ({
  x: Math.random() * 600 + 50,
  y: Math.random() * 400 + 50,
});

const BlockCanvas: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockType[]>([
    { id: 0, ...getRandomPosition() },
  ]);

const handleAdd = (parentId: number) => {
  setBlocks((prev) => {
    const parent = prev.find((b) => b.id === parentId);
    if (!parent) return prev;

    // Count existing children
    const siblings = prev.filter((b) => b.parentId === parentId).length;

    // Offset each new child horizontally and vertically
    const offsetX = 150; // horizontal spacing
    const offsetY = 150;   // keep same vertical level, or change if you want staggered vertically

    const newX = parent.x + offsetX * (siblings + 1);
    const newY = parent.y + offsetY;

    return [...prev, { id: prev.length, parentId, x: newX, y: newY }];
  });
};



  const handleDrag = (id: number, x: number, y: number) => {
    setBlocks((prev) =>
      prev.map((block) => (block.id === id ? { ...block, x, y } : block))
    );
  };

  return (
    <div className="relative h-screen overflow-hidden bg-pink-200 w-scren">
      {blocks.map((block) => (
        <Block
          key={block.id}
          {...block}
          onAdd={handleAdd}
          onDrag={handleDrag}
        />
      ))}

      {blocks.map(
        (block) =>
          block.parentId !== undefined && (
            <ConnectionLine
              key={`${block.id}-${block.parentId}`}
              x1={blocks.find((b) => b.id === block.parentId)?.x ?? 0}
              y1={blocks.find((b) => b.id === block.parentId)?.y ?? 0}
              x2={block.x}
              y2={block.y}
            />
          )
      )}
    </div>
  );
};

export default BlockCanvas;
