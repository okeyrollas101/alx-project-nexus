import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Add authentication check here
  res.status(200).json({ email: "user@example.com" });
}