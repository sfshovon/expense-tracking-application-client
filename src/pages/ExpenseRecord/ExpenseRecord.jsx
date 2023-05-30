import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import Button from '../../Components/Button/Button';
import Categories from '../../Components/Categories/Categories';
import DateTime from '../../Components/DatePicker/DateTime';
import FormData from '../../Components/FormData/FormData';
import InputField from '../../Components/InputField/InputField';
import PageTitle from '../../Components/PageTitle/PageTitle';
import useExpenseFunctions from '../../CustomHook/useExpenseFunctions';

const ExpenseRecord = () => {
  const { register, handleSubmit, handleClear, control, errors , addFormData, onFormSubmit } = useExpenseFunctions();
  
  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <PageTitle title="Add Record" />
      <div className="flex justify-center items-center gap-12 px-6">
        <div className="mt-20 container max-w-md shadow-2xl hover:shadow-lg bg-gray-200 rounded-xl">
          <h1 className="py-2 text-xl font-semibold text-center text-dark">Add An Expense Record</h1>
          <form onSubmit={handleSubmit(onFormSubmit)} className="bg-gray-100 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4">
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
          {
            addFormData && 
              <FormData formData={addFormData} />
          }
      </div>
    <ToastContainer/>
    </div>
  );
};

export default ExpenseRecord;