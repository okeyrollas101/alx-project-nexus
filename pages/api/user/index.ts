import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const method = req.method;

    if (method === "GET") {
      // Fetch user profile
      const users = await User.find({}).lean();
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ users });
    }

    if (method === "POST" && req.body.action === "logout") {
      return res.status(200).json({ message: "Logged out successfully" });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("User API error:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
}