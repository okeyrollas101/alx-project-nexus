// pages/api/transaction/initialize.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { initiatePayment } from "@/utils/chapa";

// Define the expected response from Chapa
interface ChapaResponse {
  message: string;
  status: "success" | "failed";
  data?: {
    checkout_url?: string;
    [key: string]: unknown;
  };
}

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
      return res.status(400).json({
        message: "Amount, email, firstName, orderId and lastName are required",
      });
    }

    const callbackUrl = `${process.env.BASE_URL}/api/transaction/verify?orderId=${orderId}`;

    const chapaResponse: ChapaResponse = await initiatePayment({
      amount: Number(amount), // ensure number
      currency: "USD",
      email,
      firstName,
      lastName,
      callbackUrl,
    });

    return res.status(200).json(chapaResponse);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Chapa initiatePayment failed:", error.message);
      return res.status(500).json({
        message: "Payment initiation failed",
        error: error.message,
      });
    }

    if (typeof error === "object" && error !== null && "response" in error) {
      const err = error as { response?: { data?: unknown } };
      console.error("Chapa initiatePayment failed:", err.response?.data);
      return res.status(500).json({
        message: "Payment initiation failed",
        error: err.response?.data,
      });
    }

    return res.status(500).json({
      message: "Payment initiation failed",
      error: "Unknown error",
    });
  }
}
