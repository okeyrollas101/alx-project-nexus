import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Product, { IProduct } from "@/models/Product"; // make sure your model exports IProduct interface
import { FilterQuery } from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { category } = req.query;
      // Use a typed filter compatible with Mongoose
      const filter: FilterQuery<IProduct> = {};

      if (category) filter.categoryId = category as string;

      const products = await Product.find(filter).lean();

      return res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}