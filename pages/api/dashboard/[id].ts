import { NextApiRequest, NextApiResponse } from "next";
import Category from "@/models/Category";
import User from "@/models/User";
import Product from "@/models/Product";
import Order from "@/models/Order";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // connect to database
  await Category.db?.readyState;
  await User.db?.readyState;
  await Product.db?.readyState;
  await Order.db?.readyState;
  try {
    const method = req.method;

    if (method == "GET") {
      // check signed in  user or user in  session here

      return res
        .status(200)
        .json({ message: "Dashboard data fetched successfully" });
    }
    if (method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: `Server Error ${error}` });
  }
}