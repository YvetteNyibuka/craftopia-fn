import React from 'react';

interface PrevButtonProps {
  onClick: () => void;
}

const PrevButton: React.FC<PrevButtonProps> = ({ onClick }) => {
  return (
    <button className='prevButton' onClick={onClick}>
      Prev
    </button>
  );
};

export default PrevButton;