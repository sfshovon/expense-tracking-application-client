import React from 'react';

const Button = ({ type, onClick, children }) => {
  return (
    <button 
      type={type}
      className={`${type === "submit" ? "bg-violet-800 hover:bg-green-700 text-white" : "bg-gray-200 hover:bg-red-800 text-dark hover:text-white"} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;