import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Remove cookie token
    res.setHeader("Set-Cookie", [
      `token=; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure=${
        process.env.NODE_ENV === "production" ? "true" : "false"
      }`,
    ]);

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
}