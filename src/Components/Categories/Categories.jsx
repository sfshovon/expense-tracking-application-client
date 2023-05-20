import React from 'react';
import Select from 'react-select';

const Categories = ({ setValue, selectedCategories, setSelectedCategories, categoryError, setCategoryError }) => {
  const categories = [
    { value: 'Commute', label: 'Commute' },
    { value: 'Eating Out', label: 'Eating Out' },
    { value: 'Gardening', label: 'Gardening' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Utilities', label: 'Utilities' }
  ];
  const checkCategoryError = (selectedCategories) => {
    if (selectedCategories.length === 0) {
      setCategoryError(true);
    } 
    else {
      setCategoryError(false);
    }
  };
  const handleCategoryChange = (selectedOptions) => {
    const selectedCategories = selectedOptions.map((option) => option.value);
    const categoriesText = selectedCategories.join(", ");
    setSelectedCategories(selectedOptions);
    setValue('categories', categoriesText);   
    checkCategoryError(selectedCategories);
  };
  const options = categories.map((category) => ({
    value: category.value,
    label: category.label,
  }));

  return (
    <>
      <Select
        isMulti
        options={options}
        onChange={handleCategoryChange}
        onBlur={() => checkCategoryError(selectedCategories)}
        placeholder="Choose Your Categories"
      />
      {/* <div className="font-semibold text-red-600 flex justify-start items-center">
        {categoryError && <span>Please choose at least one category</span>}
      </div> */}
    </> 
  );
};

export default Categories;