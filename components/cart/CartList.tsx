"use client";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "@/redux/slices/cartSlice";
import { CartItem } from "@/interfaces";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface Props {
  items: CartItem[];
}

const CartList: React.FC<Props> = ({ items }) => {
  const dispatch = useDispatch();

  if (items.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">
        Your cart is empty 😢 <br />
        <a
          href="/catalog"
          className="text-[#A95F21] underline mt-2 inline-block"
        >
          Browse Products
        </a>
      </div>
    );

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div className="flex  w-full  gap-4 p-4 bg-gray-200 rounded-lg shadow">
          <Image
            src={item.image || "/placeholder.png"}
            height={300}
            width={300}
            alt={item.name}
            className="w-32 h-32 object-cover rounded"
          />

          <div className=" px-4">
            <div>
              <h2 className="font-bold text-lg">{item.name}</h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="mt-2 font-semibold">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity - 1 })
                  )
                }
                className="px-2 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                  )
                }
                className="px-2 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>

          <div className="ml-auto flex flex-col items-end justify-between">
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 />
            </button>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartList;