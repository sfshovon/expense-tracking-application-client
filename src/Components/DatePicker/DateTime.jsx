import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateTime = ({ Controller, control, errors }) => {
  return (
    <>
      <Controller
        control={control}
        name="date"
        rules={{required: 'Please select a date'}}
        render={({ field }) => (
        <DatePicker
          {...field}
          selected={field.value}
          onChange={(date) => field.onChange(date)}
          placeholderText="Incurred on"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={1}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        />
        )}
      />
      {errors.date && (
        <span className="font-semibold text-red-600 flex justify-start items-center">
          {errors.date.message}
        </span>
      )}
    </>
  );
};

export default DateTime;