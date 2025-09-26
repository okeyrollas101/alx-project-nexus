// pages/api/product-details/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import ProductDetail from "@/models/ProductDetail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      const productDetails = await ProductDetail.find({})
        .populate("relatedProducts")
        .lean();

      return res.status(200).json(productDetails);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    return res.status(500).json({ message: "Failed to fetch product details", error });
  }
}