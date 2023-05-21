import React from 'react';
import { BsFillCaretDownFill, BsFillCaretUpFill } from 'react-icons/bs';
import AccordionTable from './AccordionTable';

const AccordionItem = ({ date, amount, dailyRecords, isActive, onToggle }) => {
  const dateTime = new Date(date);
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div>
      <div className="flex justify-between items-center gap-4 font-semibold px-6 py-2">
        <h3 className="text-lg text-gray-600">
          Total Expenses of {formattedDate}
        </h3>
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-blue-600">{amount}</h3>
          {isActive ? (
            <BsFillCaretUpFill className="text-2xl" onClick={() => onToggle()} />
          ) : (
            <BsFillCaretDownFill className="text-2xl" onClick={() => onToggle()} />
          )}
        </div>
      </div>
      {isActive && <AccordionTable dailyRecords={dailyRecords} />}
    </div>
  );
};

export default AccordionItem;