import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../Components/Button/Button';
import Categories from '../../Components/Categories/Categories';
import DateTime from '../../Components/DatePicker/DateTime';
import InputField from '../../Components/InputField/InputField';
import PageTitle from '../../Components/PageTitle/PageTitle';
import FormData from './FormData';

const ExpenseRecord = () => {
  const { register, setValue, handleSubmit, control, formState: { errors }, reset } = useForm({
    mode: 'onBlur', 
  });
  const [formData, setFormData] = useState(null); 

  const onSubmit = async (data) => {
    const { title, amount, categories, date, notes } = data;
    const records = { title, amount, categories, date, notes };
    try {
      const response = await fetch('http://localhost:5000/expenseRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(records),
      });
      const responseData = await response.json();
      console.log('success', responseData);
      alert('Record Added Successfully!!!');
      handleClear();
      setFormData(data);
    } 
    catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleClear= () => {
    reset(); 
    setValue('categories', null); 
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <PageTitle title="Record" />
      <div className="flex justify-center items-center gap-10">
        <div className="mt-20 container max-w-md shadow-2xl hover:shadow-lg bg-gray-200 rounded-xl">
          <h1 className="py-2 text-xl font-semibold text-center text-dark">Expense Record</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <InputField type="text" placeholder="Title" register={register} registerType="title" errors={errors} action="title" />
            </div>
            <div className="mb-4">
              <InputField type="number" placeholder="Amount (Tk.)" register={register} registerType="amount" errors={errors} action="amount" />
            </div>
            <div className="mb-4">
              <Categories Controller={Controller} control={control} errors={errors}/>
            </div>
            <div className="mb-4">
              <DateTime Controller={Controller} control={control} errors={errors}/>
            </div>
            <div className="mb-4">
              <InputField type="text" placeholder="Notes" register={register} registerType="notes" errors={errors} action="notes" />
            </div>
            <div className="pt-4 flex items-center justify-between">
              <Button action="submit" type="submit">Submit</Button>
              <Button action="cancel" onClick={handleClear}>Cancel</Button>
            </div>
          </form>
         </div>
         <div className="bg-gray-200">
           {formData && (
            <FormData formData={formData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseRecord;