import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Order from "@/models/Order";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const orders = await Order.find({ user: userId });
    const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

    return res.status(200).json({
      totalOrders: orders.length,
      totalSpent,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
}