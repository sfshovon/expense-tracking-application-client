import React from 'react';

const Button = ({ type, action, onClick, children }) => {
  let buttonClassName = "";

  switch (action) {
    case "submit":
      buttonClassName = "btn btn-sm bg-violet-800 text-white hover:bg-green-600";
      break;
    case "cancel":
      buttonClassName = "btn btn-sm bg-gray-200 text-zinc-900 hover:bg-red-800 hover:text-white";
      break;
    case "edit":
      buttonClassName = "btn btn-sm btn-info hover:bg-cyan-800 hover:text-white";
      break;
    case "delete":
      buttonClassName = "btn btn-sm btn-error hover:bg-red-800 hover:text-white";
      break;
    default:
      break;
  }

  return (
    <button 
      type={type}
      className={`${buttonClassName} font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;