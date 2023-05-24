import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loader = () => {
  return (
    <div className="flex items-center justify-center mt-8">
      <div className="flex justify-center items-center gap-8">
        <h2 className="text-5xl text-red-700 font-bold">Loading</h2>
        <AiOutlineLoading3Quarters className="text-red-700 text-5xl font-bold animate-spin"/>
      </div>
    </div>
  );
};

export default Loader;