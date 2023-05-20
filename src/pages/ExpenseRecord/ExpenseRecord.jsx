import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import Button from '../../Components/Button/Button';
import Categories from '../../Components/Categories/Categories';
import DateTime from '../../Components/DatePicker/DateTime';
import InputField from '../../Components/InputField/InputField';
import PageTitle from '../../Components/PageTitle/PageTitle';

const ExpenseRecord = () => {
  const { register, setValue, handleSubmit, formState: { errors, isValid }, watch, reset } = useForm();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleCancel = () => {
    reset();
    setSelectedDate(null);
  };

  const onSubmit = data => {
    console.log('Title:', data.title);
    console.log('Amount:', data.amount);
    console.log('Category:', data.categories);
    console.log('Date:', selectedDate);
    console.log('Notes:', data.notes);
  };

  return (
    <div className="bg-gray-50 pt-20">
      <PageTitle title="Record" />
      <div className="mt-20 container mx-auto max-w-md shadow-2xl hover:shadow-lg bg-gray-200 rounded-xl">
        <h1 className="py-2 text-xl font-semibold text-center text-dark">Expense Record</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <InputField type="text" placeholder="Title" register={register} registerType="title" errors={errors} />
          </div>
          <div className="mb-4">
            <InputField type="number" placeholder="Amount (Tk.)" register={register} registerType="amount" errors={errors} />
          </div>
          <div className="mb-4">
            <Categories setValue={setValue} setSelectedCategories={setSelectedCategories} />
          </div>
          <div className="mb-4">
            <DateTime selectedDate={selectedDate} handleDateChange={handleDateChange} />
          </div>
          <div className="mb-4">
            <InputField type="text" placeholder="Notes" register={register} registerType="notes" errors={errors} />
          </div>
          <div className="pt-4 flex items-center justify-between">
            <Button type="submit">Submit</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseRecord;