import React from 'react';
import { BsFillCaretDownFill } from 'react-icons/bs';

const AccordionItem = ({ date, amount, body, isActive, onToggle }) => {
  const dateTime = new Date(date);
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;


  return (
    <div>
      <div className="flex justify-between items-center gap-4 font-semibold px-6 py-2">
        <h3 className="text-left">
          Total Expenses of {formattedDate}
        </h3>
        <div className="flex justify-between gap-4">
          <h3 className="text-blue-600">{amount}</h3>
          <BsFillCaretDownFill onClick={() => onToggle()}/>
        </div>
      </div>
      {
        isActive && (
        <p className="px-6 py-2">{body}</p>
      )}
    </div>
  );
};

export default AccordionItem;