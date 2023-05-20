import React from 'react';

const InputField = ({ type, placeholder, onChange, register, registerType, errors }) => {
  return (
    <input
      className="shadow appearance-none border-t rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       type={type} 
       placeholder={placeholder}
       onChange={onChange}
       {...register(registerType, { 
         required: true
       })} 
    />
  );
};

export default InputField;