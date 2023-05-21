import React from 'react';

const AccordionTable = ({ dailyRecords }) => {

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl text-cyan-600 text-center font-bold my-4 tracking-widest">Expense List</h2>
      <table className="min-w-full">
        <thead className="bg-sky-100 shadow-2xl font-bold">
          <tr>
            <th className="py-2">Category</th>
            <th className="py-2">Item Name</th>
            <th className="py-2">Cost</th>
            <th className="py-2">Update</th>
          </tr>
        </thead>
        <tbody>
        {
          dailyRecords.map((record, index) => (
            <tr key={index} className="font-semibold">
              <td className="text-center bg-gray-100 border border-gray-200 shadow-2xl px-6 py-2">{record?.categories.map(option => option.label).join(', ')}</td> 
              <td className="text-center bg-gray-100 border border-gray-200 shadow-2xl px-6 py-2">{record?.title}</td>
              <td className="text-center bg-gray-100 border border-gray-200 shadow-2xl px-6 py-2">{record?.amount}</td>
              <td className="bg-gray-100 border border-gray-200 shadow-2xl px-6 py-2 flex justify-center items-center gap-4">
                <button className="btn btn-sm btn-info mr-1">Edit</button>
                <button className="btn btn-sm btn-error">Delete</button>
              </td>
            </tr>
        ))
        }
        </tbody>
      </table>
    </div>
  );
};

export default AccordionTable;