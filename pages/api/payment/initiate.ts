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
    const { amount, email, firstName, lastName } = req.body;

    if (!amount || !email || !firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "Amount, email, firstName, and lastName are required" });
    }

    const callbackUrl = `${process.env.BASE_URL}/api/payment/verify`;

    const chapaResponse = await initiatePayment({
      amount,
      currency: "RWF",
      email,
      firstName,
      lastName,
      callbackUrl,
    });

    res.status(200).json(chapaResponse);
  } catch (error) {
    res.status(500).json({ message: "Payment initiation failed", error });
  }
}