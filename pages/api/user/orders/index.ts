// /api/user/orders/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Order from "@/models/Order";
import { verifyToken } from "@/utils/VerifyToken";

interface DecodedToken {
  userId: string;
  role?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      // ✅ Check Authorization
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized — no token" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token) as DecodedToken;
      if (!decoded?.userId) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // ✅ Extract order details from request body
      const { items, subtotal, shipping, tax, total, paymentMethod } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({ message: "Cart items required" });
      }

      if (typeof subtotal !== "number" || typeof total !== "number") {
        return res.status(400).json({ message: "Subtotal and total must be numbers" });
      }

      // ✅ Create new order
      const order = new Order({
        user: decoded.userId,
        items,
        subtotal,
        shipping: shipping ?? 0,
        tax: tax ?? 0,
        total,
        paymentMethod: paymentMethod || "Chapa", // default to Chapa
        status: "pending",
      });

      await order.save();

      return res.status(201).json({ message: "New order created", order });
    } catch (error: unknown) {
      console.error("Order creation error:", error);
      if (error instanceof Error) {
        return res.status(500).json({ message: "Failed to create order", error: error.message });
      }
      return res.status(500).json({ message: "Failed to create order", error: "Unknown error" });
    }
  }

  if (req.method === "GET") {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized — no token" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = verifyToken(token) as DecodedToken;
      if (!decoded?.userId) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // ✅ Fetch all orders for this user
      const orders = await Order.find({ user: decoded.userId }).populate("items.product");

      return res.status(200).json({ message: "success", orders });
    } catch (error: unknown) {
      console.error("Order fetch error:", error);
      if (error instanceof Error) {
        return res.status(500).json({ message: "Server error", error: error.message });
      }
      return res.status(500).json({ message: "Server error", error: "Unknown error" });
    }
  }
  return res.status(405).json({ message: "Method Not Allowed" });
}