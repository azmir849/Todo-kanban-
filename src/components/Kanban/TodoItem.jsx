// src/components/TodoItem.js
import React, { useState } from 'react';
import ContextMenu from './ContextMenu';

const TodoItem = ({ item, onMoveItem }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleRightClick = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

  return (
    <div className="todo-item" onContextMenu={handleRightClick}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      {showContextMenu && (
        <ContextMenu
          item={item}
          onMoveItem={onMoveItem}
          onClose={() => setShowContextMenu(false)}
        />
      )}
    </div>
  );
};

export default TodoItem;
