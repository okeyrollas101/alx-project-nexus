import type { NextApiRequest, NextApiResponse } from "next";
import { verifyPayment } from "@/utils/chapa";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({ message: "Payment reference is required" });
    }

    const verification = await verifyPayment(reference as string);

    res.status(200).json(verification);
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed", error });
  }
}