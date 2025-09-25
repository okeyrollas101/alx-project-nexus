import React from 'react';
import { ComponentType } from "react";

interface ButtonProps {
  Icon?: ComponentType<any>;     // Optional icon (any React component)
  onClick?: () => void;          // Optional click handler
  className?: string;            // Optional custom classes
}

function Button({Icon}: ButtonProps) {
    return (
        <div className="bg-gray-200 hover:transition duration-300 ease-in-out hover:bg-gray-300 w-12 h-12 flex items-center justify-center rounded-[8px]">
          {Icon && <Icon color="green" className="hover:animate-pulse cursor-pointer" size={40} />}
        </div>
    );
}

export default Button;