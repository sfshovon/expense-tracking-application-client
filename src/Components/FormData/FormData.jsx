import React from 'react';

const FormData = ({ formData }) => {
  return (
    <div className="mt-12 bg-gray-600 shadow-2xl rounded-2xl">
      <h2 className="mt-4 text-lg text-white text-center font-semibold rounded-xl">Form Data</h2>
      <div className="my-4 px-8 bg-base-300">
        <p className="mb-4"><strong>Title:</strong> {formData?.title}</p>
        <p className="mb-4"><strong>Amount:</strong> {formData?.amount}</p>
        <p className="mb-4"><strong>Categories:</strong> {formData?.categories?.label}</p>
        <p className="mb-4"><strong>Date:</strong> {formData?.date.toString()}</p>
        <p className="mb-14"><strong>Notes:</strong> {formData?.notes}</p>
      </div>
    </div>
  );
};

export default FormData;