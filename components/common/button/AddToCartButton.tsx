"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/redux/slices/cartSlice";

interface AddToCartButtonProps {
  id: string;
  name: string;
  description: string;
  price: string ;
  image: string;
  discount?: string;
  hasDiscount?: boolean;
  quantity?: number;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  id,
  name,
  description,
  price,
  image,
  discount = 0,
  hasDiscount = false,
  quantity = 1,
  className,
}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation if inside a Link
    const finalPrice = hasDiscount
      ? Number(price) - (Number(price) * Number(discount)) / 100
      : Number(price);

    dispatch(
      addToCart({
        id,
        name,
        description,
        price: finalPrice,
        quantity,
        image,
      })
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`bg-[#F59D55] flex items-center text-white px-4 py-2 rounded-lg hover:bg-[#A95F21] transition ${className}`}
    >
      <ShoppingCart className="mr-2" size={18} />
      Add
    </button>
  );
};

export default AddToCartButton;