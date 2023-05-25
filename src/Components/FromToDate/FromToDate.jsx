import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FromToDate = ({ fromDate, toDate, setFromDate, setToDate }) => {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="">
        <label htmlFor="fromDate" className="font-semibold">
          From:
        </label>
        <DatePicker
          id="fromDate"
          selected={fromDate}
          onChange={(date) => setFromDate(new Date(date))}
          placeholderText="From"
          dateFormat="MMMM d, yyyy"
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        />
      </div>
      <div className="">
        <label htmlFor="toDate" className="font-semibold">
          To:
        </label>
        <DatePicker
          id="toDate"
          selected={toDate}
          onChange={(date) => setToDate(new Date(date))}
          placeholderText="To"
          dateFormat="MMMM d, yyyy"    
          minDate={fromDate} 
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        />
      </div>
    </div>
  );
};

export default FromToDate;