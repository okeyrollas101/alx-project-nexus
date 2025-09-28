import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/mongodb";
import User from "@/models/User";
import { setTokenCookie } from "@/utils/setCookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    await dbConnect();
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "User account is inactive" });
    }

    //  Create JWT
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    //  Secure Cookie options
    // res.setHeader("Set-Cookie", [
    //   `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure=${
    //     process.env.NODE_ENV === "production" ? "true" : "false"
    //   }`,
    // ]);

    setTokenCookie(res, token);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}