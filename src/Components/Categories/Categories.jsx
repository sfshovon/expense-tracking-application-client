import React from 'react';
import Select from 'react-select';

const Categories = ({ setValue, setSelectedCategories }) => {
  const categories = [
    { value: 'Commute', label: 'Commute' },
    { value: 'Eating Out', label: 'Eating Out' },
    { value: 'Gardening', label: 'Gardening' },
    { value: 'Groceries', label: 'Groceries' },
    { value: 'Utilities', label: 'Utilities' }
  ];
  const handleCategoryChange = (selectedOptions) => {
    const selectedCategories = selectedOptions.map((option) => option.value);
    const categoriesText = selectedCategories.join(", ");
    setSelectedCategories(selectedOptions);
    setValue('categories', categoriesText);   
  };
  const options = categories.map((category) => ({
    value: category.value,
    label: category.label,
  }));

  return (
    <Select
      isMulti
      options={options}
      onChange={handleCategoryChange}
      placeholder="Choose Your Categories"
    />
  );
};

export default Categories;