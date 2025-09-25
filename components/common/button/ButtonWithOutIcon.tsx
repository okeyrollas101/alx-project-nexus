import React from 'react';

interface ButtonProps {
  label: string;               
  onClick?: () => void;          
  className?: string;            
}

function ButtonWithOutIcon({label,onClick}: ButtonProps) {
    return (
      <button onClick={onClick} className="font-medium text-xl flex items-center justify-center gap-2 w-[350.54px] rounded-[8px]  px-4 py-3 text-gray-800 border-2 border-gray-300 hover:bg-[#F59D55] hover:text-white transition">
      <span>{label}</span>
    </button>
    );
}


export default ButtonWithOutIcon;