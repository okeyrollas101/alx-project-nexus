import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ message: "User ID required" });

    const user = await User.findById(id).populate("wishlist");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user.wishlist);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
}