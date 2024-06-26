// src/components/Column.js
import React from 'react';
import ExpandableCard from './ExpandableCard';

const Column = ({ title, items,onMoveItem, handleOpen }) => {
  return(
      <div className="column">
        <ExpandableCard title={title} items={items} onMoveItem={onMoveItem} handleOpen={handleOpen} />
      </div>
  )
};

export default Column;
