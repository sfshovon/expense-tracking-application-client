import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({ records }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const uniqueDates = [...new Set(records.map((record) => record.date.split("T")[0]))];

  return (
    <div className="w-1/2 mx-auto">
      <div className="grid grid-cols-1 bg-gray-100 shadow-2xl rounded-xl p-8">
        {
          uniqueDates.map((date, index) => {
            const dailyRecords = records.filter((record) => record?.date?.split("T")[0] === date);
            const totalDailyAmount = dailyRecords.reduce((dailyTotal, record) => dailyTotal + record?.amount, 0);
            return (
              <AccordionItem
                key={index}
                date={date}
                amount={totalDailyAmount} 
                dailyRecords={dailyRecords}
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