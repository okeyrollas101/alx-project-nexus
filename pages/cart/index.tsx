"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearCart } from "@/redux/slices/cartSlice";
import CartList from "@/components/cart/CartList";
import OrderSummary from "@/components/cart/orderSummary";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = +(subtotal + shipping + tax).toFixed(2);

  return (
    <div className="px-4 lg:px-16 py-6 space-y-6">
      <header className="flex justify-between items-center gap-4 pb-12 pt-6">
        <section className="text-center md:text-left space-y-2">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <span className="text-gray-600">
            {cartItems.length} items in your cart
          </span>
        </section>
        <button className="flex items-center space-x-4 px-4 py-2 border border-gray-300 hover:text-gray-50 text-gray-600 rounded-lg hover:bg-[#A95F21]">
          <ArrowLeft className="inline mr-2" />
          <Link href={"/catalog"}>Continue Shopping</Link>
        </button>
      </header>

      {/* Cart Actions + List */}
      <div className="block lg:flex gap-8">
        <div className="lg:w-1/2 w-full ">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-[25px]">Cart Items</h1>
            <button
              onClick={() => dispatch(clearCart())}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
          <div className="py-6">
            <CartList items={cartItems} />
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
          <div>
            {/* Why Shop With Us */}{" "}
            <div className="mt-6 space-y-2  bg-gray-200 w-2/3  px-6 py-12 rounded-lg">
              {" "}
              <h3 className="font-bold text-2xl text-gray-900">Why shop with us?</h3>{" "}
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {" "}
                <li>Free shipping on orders over $50</li>{" "}
                <li>30-day return policy</li>
                <li>Secure payment processing</li>{" "}
                <li>24/7 customer support</li>{" "}
              </ul>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;