import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Product, { IProduct } from "@/models/Product";
import { FilterQuery } from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const { category } = req.query;
      const filter: FilterQuery<IProduct> = {};

      if (category) filter.categoryId = category as string;

      const products = await Product.find(filter).lean();
      return res.status(200).json(products);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Server error", error: String(error) });
  }
}