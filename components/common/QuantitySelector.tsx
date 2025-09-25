import React, { useState } from "react";

interface QuantitySelectorProps {
  initialQuantity?: number;
  min?: number;
  max?: number;
  onChange?: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  min = 1,
  max = 100,
  onChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const decrease = () => {
    if (quantity > min) {
      setQuantity(prev => {
        const newQty = prev - 1;
        onChange?.(newQty);
        return newQty;
      });
    }
  };

  const increase = () => {
    if (quantity < max) {
      setQuantity(prev => {
        const newQty = prev + 1;
        onChange?.(newQty);
        return newQty;
      });
    }
  };

  return (
    <div className="flex items-center space-x-4 my-6">
      <h1 className="font-semibold text-[25px]">Quantities:</h1>
      <div className="flex border rounded-md overflow-hidden">
        <button
          onClick={decrease}
          className="px-3 border-r border-gray-200 text-xl hover:bg-gray-100 transition"
        >
          -
        </button>
        <button className="px-3 border-r border-gray-200 text-xl">{quantity}</button>
        <button
          onClick={increase}
          className="px-3 text-xl hover:bg-gray-100 transition"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;