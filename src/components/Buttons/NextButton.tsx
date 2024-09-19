import React from 'react';

interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return (
    <button className='nextButton' onClick={onClick}>
      Next
    </button>
  );
};

export default NextButton;