import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton: React.FC = () => {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
      <FiArrowLeft className="mr-2" /> Back
    </button>
  );
};

export default BackButton;
