import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

const Accordion = ({ records }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    console.log(uniqueDates)
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const uniqueDates = [...new Set(records.map((record) => record.date.split("T")[0]))];

  return (
    <div className="w-1/3 mx-auto">
      <div className="grid grid-cols-1 bg-gray-100 shadow-2xl rounded-xl p-8">
        {uniqueDates.map((date, index) => {
          const record = records.find((record) => record.date.split("T")[0] === date);
          return (
            <AccordionItem
              key={index}
              date={date}
              amount={record.amount}
              body={record.title}
              isActive={activeIndex === index}
              onToggle={() => handleToggle(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;