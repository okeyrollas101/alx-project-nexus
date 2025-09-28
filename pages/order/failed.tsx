// pages/order/failed.tsx
import { GetServerSideProps } from "next";
import dbConnect from "@/utils/mongodb";
import Order from "@/models/Order";

interface FailedPageProps {
  orderId: string;
}

const FailedPage = ({ orderId }: FailedPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>
      <p className="mt-4">Your order <strong>{orderId}</strong> was not completed.</p>
      <p className="mt-2">Please try again or contact support.</p>
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

export default FailedPage;