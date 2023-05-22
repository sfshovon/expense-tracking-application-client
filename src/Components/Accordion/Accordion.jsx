import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({ records, handleExpenseDelete, handleUpdateExpense }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const uniqueDates = Array.from(
    new Set(
      records.map((record) =>
        new Date(record.date).toLocaleDateString('en-US')
      )
    )
  );
  
  return (
    <div className="mt-1 mx-auto">
      <div className="grid grid-cols-1 bg-gray-200 shadow-3xl rounded-xl p-8">
        {
          uniqueDates.map((date, index) => {
            const dailyRecords = records.filter((record) => new Date(record.date).toLocaleDateString('en-US') === date);
            const totalDailyAmount = dailyRecords.reduce((dailyTotal, record) => parseInt(dailyTotal) + parseInt(record?.amount), 0);
            return (
              <AccordionItem
                key={index}
                date={date}
                amount={totalDailyAmount} 
                dailyRecords={dailyRecords}
                handleExpenseDelete={handleExpenseDelete}
                handleUpdateExpense={handleUpdateExpense}
                isActive={activeIndex === index}
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