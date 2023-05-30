import React from 'react';
import Select from 'react-select';

const Categories = ({ Controller, control, errors }) => {
  const categories = [
    { value: 'Commute', label: 'Commute' },
    { value: 'Eating Out', label: 'Eating Out' },
    { value: 'Gardening', label: 'Gardening' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Utilities', label: 'Utilities' }
  ];

  return (
    <>
      <Controller
        control={control}
        name="categories"
        rules={{ required: 'Please select at least one category' }} 
        render={({ field }) => (
          <Select
            {...field}
            options={categories}
            placeholder="Choose Your Categories"
          />
        )}
      />
      { 
        errors.categories && (
          <span className="font-semibold text-red-600 flex justify-start items-center">
            {errors.categories.message}
          </span>
        )
      }
    </> 
  );
};

export default Categories;