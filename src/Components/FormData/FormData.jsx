import React from 'react';

const FormData = ({ formData }) => {
  return (
    <div className="bg-gray-100 shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4">
      <h2 className="py-2 text-lg font-semibold text-center">Form Data</h2>
      <p><strong>Title:</strong> {formData?.title}</p>
      <p><strong>Amount:</strong> {formData?.amount}</p>
      <p><strong>Categories:</strong> {formData?.categories?.label}</p>
      <p><strong>Date:</strong> {formData?.date.toString()}</p>
      <p><strong>Notes:</strong> {formData?.notes}</p>
    </div>
  );
};

export default FormData;