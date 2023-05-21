import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTime = ({ selectedDate, handleDateChange, dateError, checkDateError }) => {
  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        onBlur={checkDateError}
        placeholderText="Incurred on"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      { 
        dateError && 
        <span className="font-semibold text-red-600 flex justify-start items-center">Select a date and time</span>
      }
    </>
  );
};

export default DateTime;