// import {Icon} from "lucide-react";
import React from "react";



// eslint-disable-next-line react/prop-types
const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3  pointer-events-none">
        <Icon className="text-green-500 size-5"/>
        </div>
      <input 
        {...props}
        className="w-full pl-10 pr-3 py-2 bg-gray-500 bg-opacity-50 rounded-lg border-gray-700 focus:border-green-500"
      />
    </div>
  );
};

export default Input;
