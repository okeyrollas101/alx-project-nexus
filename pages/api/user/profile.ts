import type { NextApiRequest, NextApiResponse } from "next";
import { getUserById } from "@/utils/db"; // your DB function
import { verifyToken } from "@/utils/auth"; // authentication function

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = verifyToken(token);
    const userId = typeof decoded === "object" && decoded !== null && "id" in decoded ? (decoded as any).id : undefined; // your auth verification

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await getUserById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching profile", error });
  }
}