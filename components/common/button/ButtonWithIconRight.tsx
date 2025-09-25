import React from 'react';
import { ComponentType } from "react";

interface ButtonProps {
  label: string;                 // Text inside the button
  Icon?: ComponentType<any>;     // Optional icon (any React component)
  onClick?: () => void;          // Optional click handler
  className?: string;            // Optional custom classes
}

function Button({label,Icon}: ButtonProps) {
    return (
        <button className="flex font-medium text-xl items-center justify-center gap-2 w-[350.54px] rounded-[8px] bg-[#A95F21] px-4 py-3 text-white hover:bg-[#F59D55] cursor-pointer transition">
      <span>{label}</span>
      {Icon && <Icon />} {/* Render icon dynamically */}
    </button>
    );
}

export default Button;