import React, { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { RiCloseCircleFill } from 'react-icons/ri';
import Button from '../Button/Button';
import Categories from '../Categories/Categories';
import InputField from '../InputField/InputField';

const Modal = ({ isModalOpen, setIsModalOpen, editExpenseRecord, handleUpdateExpense }) => {
  const { register, setValue, handleSubmit, control, formState: { errors } } = useForm({
    mode: 'onBlur', 
  });
  const onSubmit = (data) => {
    setIsModalOpen(false);
    handleUpdateExpense(editExpenseRecord[0]._id, data);
  };
  useEffect(() => {
    if (editExpenseRecord.length > 0) {
      const record = editExpenseRecord[0];
      setValue('title', record.title);
      setValue('amount', record.amount);
      setValue('categories', record.categories);
      setValue('notes', record.notes);
    }
  }, [editExpenseRecord]);
  
  return (
    <div>
      <div className={`modal modal-bottom sm:modal-middle ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box bg-gray-200 shadow-2xl rounded-2xl">
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-xl text-cyan-600 font-bold">Edit Record</h3>
            <RiCloseCircleFill className="text-3xl rounded-full hover:bg-white hover:text-red-700 cursor-pointer" onClick={() => setIsModalOpen(false)} />
          </div>
          {
            editExpenseRecord.map((record) => (
              <div key={record?._id}>
                <form onSubmit={handleSubmit(onSubmit)} className="bg-sky-50 shadow-2xl rounded-xl p-4">
                  <div className="mb-4">
                    <InputField type="text" placeholder="Title" register={register} registerType="title" errors={errors} action="title" defaultValue={record?.title} />
                  </div>
                  <div className="mb-4">
                    <InputField type="number" placeholder="Amount (Tk.)" register={register} registerType="amount" errors={errors} action="amount" defaultValue={record?.amount} />
                  </div>
                  <div className="mb-4">
                    <Categories Controller={Controller} control={control} errors={errors} defaultValue={record?.categories}/>
                  </div>
                  <div className="mb-4">
                    <InputField type="text" placeholder="Notes" register={register} registerType="notes" errors={errors} action="notes" defaultValue={record?.notes}/>
                  </div>
                  <div className="modal-action">
                    <Button type="submit" action="submit">Save</Button>
                  </div>
                </form>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;
