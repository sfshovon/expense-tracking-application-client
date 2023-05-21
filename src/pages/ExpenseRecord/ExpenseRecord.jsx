import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import Button from '../../Components/Button/Button';
import Categories from '../../Components/Categories/Categories';
import DateTime from '../../Components/DatePicker/DateTime';
import InputField from '../../Components/InputField/InputField';
import PageTitle from '../../Components/PageTitle/PageTitle';

const ExpenseRecord = () => {
  const { register, setValue, handleSubmit, formState: { errors, isValid }, reset } = useForm();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryError, setCategoryError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const checkFormValidity = () => {
    const hasDateError = !selectedDate;
    const hasCategoryError = selectedCategories.length === 0;
    setDateError(hasDateError);
    setCategoryError(hasCategoryError);
    setIsFormValid(!hasDateError && !hasCategoryError && isValid);
  };
  const handleCancel = () => {
    reset();
    setSelectedDate(null);
    setCategoryError(false);
    setDateError(false);
    setIsFormValid(true);
  };
  const onSubmit = data => {
    checkFormValidity();
    if (isFormValid) {
      console.log('Title:', data.title);
      console.log('Amount:', data.amount);
      console.log('Category:', data.categories);
      console.log('Date:', selectedDate);
      console.log('Notes:', data.notes);
    }
  };
  useEffect(() => {
    checkFormValidity();
  }, [errors, selectedDate, selectedCategories]);

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
            <Categories setValue={setValue} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} categoryError={categoryError} setCategoryError={setCategoryError} />
          </div>
          <div className="mb-4">
            <DateTime selectedDate={selectedDate} handleDateChange={setSelectedDate} dateError={dateError} />
          </div>
          <div className="mb-4">
            <InputField type="text" placeholder="Notes" register={register} registerType="notes" errors={errors} action="notes" />
          </div>
          <div className="pt-4 flex items-center justify-between">
            <Button type="submit" isFormValid={isFormValid}>Submit</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseRecord;