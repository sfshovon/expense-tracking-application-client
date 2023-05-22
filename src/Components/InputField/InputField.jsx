import React from 'react';

const InputField = ({ type, placeholder, defaultValue, onChange, register, registerType, action, errors }) => {
  return (
    <>
      <input
        className="shadow appearance-none border-t rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type} 
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        {...register(registerType, { 
          required: true,
          pattern: 
            action === "title" 
            ? {
                value: /^[A-Z][A-Za-z0-9 ]*$/,    
                message: "Please enter a valid title",
            }
            : action === "amount" 
            ? {
                value: /^[0-9]\d*$/,    
                message: "Price can't be negative",
            }
            : action === "notes" 
            ? {
                value: /^(?=.*[^\s])[\s\S]*$/,    
                message: "Please enter a valid notes",
            }
            : null 
        })} 
      />
      {
        errors[registerType] && errors[registerType].type === "required" && (
          <div className="font-semibold text-red-600 flex justify-start items-center">
            {placeholder ? `${placeholder} is required` : "This is a required field"}
          </div>
      )}
      { 
        errors[registerType] && errors[registerType].type === "pattern" && (
        <div className="font-semibold text-red-600 flex justify-start items-center">
          <span className="text-justify">{errors[registerType].message}</span>
        </div>
      )}
    </>
  );
};

export default InputField;