import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/utils/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await dbConnect();
  const { email, firstName, lastName, password } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const token = jwt.sign(
    { email, firstName, lastName },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword
  });

  if (user.email === process.env.ADMIN_EMAIL) {
    user.role = "admin";
  }

  if (!hashedPassword || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  await user.save();
  res.status(201).json({ message: "User registered successfully", token,user});
}