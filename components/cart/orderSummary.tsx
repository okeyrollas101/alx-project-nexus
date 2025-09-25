"use client";
import Link from "next/link";

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary: React.FC<Props> = ({ subtotal, shipping, tax, total }) => {
  return (
    <div className="bg-gray-200 p-12 shadow rounded-lg space-y-4 ">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
      </div>
      <div className="flex justify-between mb-10">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <hr className="text-gray-300 mb-10"/>
      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex flex-col space-y-2">
      <button className=" bg-[#F59D55] text-white py-3 rounded hover:bg-[#A95F21]">
        Proceed to Checkout
      </button>
      <Link
        href="/catalog"
        className="block text-center mt-2 py-3 border border-gray-300 rounded hover:bg-[#A95F21] hover:text-white transition duration-700 ease-in-out"
      >
        Continue Shopping
      </Link>
      </div>
    </div>
  );
};

export default OrderSummary;