import React from 'react';
import Select from 'react-select';

const Categories = ({ Controller, control, errors, defaultValue }) => {
  const categories = [
    { value: 'Commute', label: 'Commute' },
    { value: 'Eating Out', label: 'Eating Out' },
    { value: 'Gardening', label: 'Gardening' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Utilities', label: 'Utilities' }
  ];
  const options = categories.map((category) => ({
    value: category.value,
    label: category.label,
  }));

  return (
    <>
      <Controller
        control={control}
        name="categories"
        rules={{ required: 'Please select at least one category' }} 
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            onChange={(selectedOption) => field.onChange(selectedOption)}
            onBlur={field.onBlur}
            defaultValue={defaultValue}
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