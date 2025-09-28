import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import User from "@/models/User";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  try {
    // ✅ Check authentication first
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized — no token" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "supersecret";

    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized — invalid token" });
    }

    // ✅ Only allow the user themselves OR admins
    if (decoded.userId !== id && decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden — cannot access other users' data" });
    }

    const method = req.method;

    // ✅ Update user
    if (method === "PUT") {
      const updateData = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: `User with id ${id} not found` });
      }

      return res.status(200).json({ message: "User Updated", user: updatedUser });
    }

    // ✅ Delete user
    if (method === "DELETE") {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: `User with id ${id} not found` });
      }

      return res.status(200).json({ message: "User Deleted", user: deletedUser });
    }

    // ✅ Fetch user + orders
    if (method === "GET") {
      const user = await User.findById(id).select("-password").lean();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const orders = await Order.find({ user: id })
        .populate("items.product", "name image price")
        .sort({ createdAt: -1 })
        .lean();

      return res.status(200).json({ user, orders });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("User API error:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
}