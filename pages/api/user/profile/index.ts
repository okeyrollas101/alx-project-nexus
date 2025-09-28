import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import { verifyToken } from "@/utils/VerifyToken";
import User from "@/models/User";
import cookie from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let token: string | undefined;

  if (req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    token = cookies.token;
  }

  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
  }

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
    return res.status(401).json({ message: "Invalid token payload" });
  }

  const userId = (decoded as any).userId;

  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "User not found" });

  return res.status(200).json(user);
}