import React from 'react';

const Button = ({ type, onClick, children, isFormValid }) => {
  return (
    <button 
      type={type}
      className={`${type === "submit" ? "bg-violet-800 text-white" : "bg-gray-200 hover:bg-red-800 text-dark hover:text-white"} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      onClick={onClick}
      // disabled={isFormValid}
    >
      {children}
    </button>
  );
};

export default Button;