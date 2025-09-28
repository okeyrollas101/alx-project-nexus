// pages/api/transaction/verify.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Order from "@/models/Order";
import { verifyPayment } from "@/utils/chapa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const reference = req.query.reference as string;
    const orderId = req.query.orderId as string;

    if (!reference || !orderId) {
      return res
        .status(400)
        .json({ message: "Payment reference and orderId are required" });
    }

    console.log(
      `[VERIFY] Starting verification for orderId: ${orderId}, reference: ${reference}`
    );

    const verification = await verifyPayment(reference);

    console.log("[VERIFY] Chapa verification result:", verification);

    if (
      verification?.status === "success" ||
      verification?.data?.status === "success"
    ) {
      await Order.findByIdAndUpdate(orderId, {
        status: "paid",
        transactionId: reference,
      });
      console.log(`[VERIFY] Payment successful for orderId: ${orderId}`);

      return res.redirect(`/order/success?orderId=${orderId}`);
    } else {
      await Order.findByIdAndUpdate(orderId, { status: "failed" });
      console.log(`[VERIFY] Payment failed for orderId: ${orderId}`);

      return res.redirect(`/order/failed?orderId=${orderId}`);
    }
  } catch (error: any) {
    console.error(
      "[VERIFY] Payment verification failed:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({
        message: "Payment verification failed",
        error: error.response?.data || error.message,
      });
  }
}