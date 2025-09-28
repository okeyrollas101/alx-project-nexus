// pages/order/success.tsx
import { GetServerSideProps } from "next";
import dbConnect from "@/utils/mongodb";
import Order from "@/models/Order";

interface SuccessPageProps {
  orderId: string;
}

const SuccessPage = ({ orderId }: SuccessPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful ✅</h1>
      <p className="mt-4">Your order <strong>{orderId}</strong> has been paid successfully.</p>
      <p className="mt-2">Thank you for shopping with us!</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { orderId } = context.query;

  await dbConnect();

  const order = await Order.findById(orderId as string);

  if (!order) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      orderId,
    },
  };
};

export default SuccessPage;