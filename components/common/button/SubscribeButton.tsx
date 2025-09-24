import React from 'react';

interface ButtonProps {
  label: string;               
  onClick?: () => void;          
  className?: string;            
}

function SubscribeButton({label,onClick}: ButtonProps) {
    return (
      <button onClick={onClick} type='submit' className="font-medium text-xl flex items-center justify-center gap-2 w-[350.54px] rounded-[8px]  px-4 py-3 text-gray-100 border-2 border-gray-300 bg-[#A95F21] hover:bg-[#F59D55] hover:text-white cursor-pointer transition duration-500 ease-in-out">
      <span>{label}</span>
    </button>
    );
}


export default SubscribeButton;