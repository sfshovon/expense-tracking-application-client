import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../Components/Button/Button';
import Categories from '../../Components/Categories/Categories';
import DateTime from '../../Components/DatePicker/DateTime';
import InputField from '../../Components/InputField/InputField';
import PageTitle from '../../Components/PageTitle/PageTitle';

const ExpenseRecord = () => {
  const { register, setValue, handleSubmit, control, formState: { errors }, reset } = useForm({
    mode: 'onBlur', 
  });
  const [formData, setFormData] = useState(null); 

  const onSubmit = data => {
    const title = data.title;
    const amount = data.amount;
    const categories = data.categories;
    const date = data.date;
    const notes = data.notes
    const records = {title, amount, categories, date, notes};
    fetch('http://localhost:5000/expenseRecord', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(records)
    })
    .then(res => res.json())
    .then(data =>{
        console.log('success', data);
        alert('Record Added Successfully!!!');
        handleClear();
    })
    setFormData(data); 
  };


  const handleClear= () => {
    reset(); 
    setValue('categories', null); 
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <PageTitle title="Record" />
      <div className="mt-20 container mx-auto max-w-md shadow-2xl hover:shadow-lg bg-gray-200 rounded-xl">
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
            <Button type="submit">Submit</Button>
            <Button onClick={handleClear}>Cancel</Button>
          </div>
        </form>

        {formData && (
          <div className="bg-gray-100 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4">
            <h2 className="py-2 text-lg font-semibold text-center">Form Data</h2>
            <p><strong>Title:</strong> {formData.title}</p>
            <p><strong>Amount:</strong> {formData.amount}</p>
            <p><strong>Categories:</strong> {formData.categories.map(option => option.label).join(', ')}</p>
            <p><strong>Date:</strong> {formData.date.toString()}</p>
            <p><strong>Notes:</strong> {formData.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseRecord;