import React from 'react';

const TotalExpense = ({ totalExpense }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="alert px-6 bg-sky-200 shadow-lg flex flex-row justify-between">
        <span className="text-xl font-bold">Total Expense</span>
        <span className="text-xl font-bold text-red-600">{totalExpense.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default TotalExpense;