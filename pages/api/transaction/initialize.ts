// pages/api/transaction/initialize.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { initiatePayment } from "@/utils/chapa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { amount, email, firstName, lastName, orderId } = req.body;

    if (!amount || !email || !firstName || !lastName || !orderId) {
      return res
        .status(400)
        .json({ message: "Amount, email, firstName,orderId and lastName are required" });
    }

const callbackUrl = `${process.env.BASE_URL}/api/transaction/verify?orderId=${orderId}`;

    const chapaResponse = await initiatePayment({
      amount: Number(amount), // ensure number
      currency: "USD",
      email,
      firstName,
      lastName,
      callbackUrl,
    });

    return res.status(200).json(chapaResponse);
  } catch (error: any) {
    console.error("Chapa initiatePayment failed:", error.response?.data || error.message);
    return res.status(500).json({ message: "Payment initiation failed", error: error.response?.data || error.message });
  }
}