"use client";

import { Cross, X } from "lucide-react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

 function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          title="Close Modal"
          className="absolute top-6 right-6 border border-gray-300 rounded-full p-2 hover:border-none hover:bg-red-500 text-gray-500 hover:text-gray-100 cursor-pointer"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;