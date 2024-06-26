// src/components/ContextMenu.js
import React from 'react';

const ContextMenu = ({ item, onMoveItem, onClose }) => {
  const handleMove = (newStatus) => {
    onMoveItem(item.id, newStatus);
    onClose();
  };

  return (
    <div className="context-menu">
      {item.status !== 'New' && <button onClick={() => handleMove('New')}>Move to New</button>}
      {item.status !== 'Ongoing' && <button onClick={() => handleMove('Ongoing')}>Move to Ongoing</button>}
      {item.status !== 'Done' && <button onClick={() => handleMove('Done')}>Move to Done</button>}
    </div>
  );
};

export default ContextMenu;
