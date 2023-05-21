import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../Components/Button/Button';
import InputField from '../../Components/InputField/InputField';
import PageTitle from '../../Components/PageTitle/PageTitle';

const ExpenseRecord = () => {
  const { register, setValue, handleSubmit, control, formState: { errors, isValid }, reset } = useForm();
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [categoryError, setCategoryError] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [dateError, setDateError] = useState(false);

  const handleCancel = () => {
    reset();
    // setSelectedDate(null);
  };

  const onSubmit = data => {
    console.log(data)
    
      console.log('Title:', data.title);
      console.log('Amount:', data.amount);
      console.log('Category:', data.categories);
      console.log('Date:', selectedDate);
      console.log('Notes:', data.notes);
  
  }

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
            {/* <Categories setValue={setValue} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} categoryError={categoryError} setCategoryError={setCategoryError} /> */}
          </div>
          <div className="mb-4">
            {/* <DateTime selectedDate={selectedDate} handleDateChange={setSelectedDate} dateError={dateError} /> */}
            <Controller
              control={control}
              name="date"
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
          </div>
          <div className="mb-4">
            <InputField type="text" placeholder="Notes" register={register} registerType="notes" errors={errors} action="notes" />
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