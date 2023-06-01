import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({ records, handleExpenseDelete, handleUpdateExpense }) => {
  const [activeIndices, setActiveIndices] = useState([]);

  const handleToggle = (index) => {
    setActiveIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } 
      else {
        return [...prevIndices, index];
      }
    });
  };

  const uniqueDates = [...new Set(records.map((record) =>
    new Date(record?.date).toLocaleDateString('en-US')
  ))];

  return (
    <div className="mt-2 mx-auto">
      <div className="bg-gray-200 shadow-3xl rounded-xl p-8">
        {
          uniqueDates.map((date, index) => {
            const dailyRecords = records.filter((record) => new Date(record?.date).toLocaleDateString('en-US') === date);
            const totalDailyAmount = dailyRecords.reduce((dailyTotal, record) => dailyTotal + parseFloat(record?.amount), 0);
            return (
              <AccordionItem
                key={index}
                date={date}
                amount={totalDailyAmount}
                dailyRecords={dailyRecords}
                handleExpenseDelete={handleExpenseDelete}
                handleUpdateExpense={handleUpdateExpense}
                isActive={activeIndices.includes(index)}
                onToggle={() => handleToggle(index)}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Accordion;