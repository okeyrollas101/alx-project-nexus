// pages/api/product-details/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import ProductDetail, { IProductDetail } from "@/models/ProductDetail";
import Product, { IProduct } from "@/models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // 1. Find the product detail
      const productDetail:IProductDetail | null = await ProductDetail.findOne({id})
      .populate("relatedProducts")
      .lean<IProductDetail>();

      if (!productDetail) {
        return res.status(404).json({ message: "Product detail not found" });
      }

      // 2. Fetch all products in the same category (excluding itself)
      const relatedProducts : IProduct[] = await Product.find({
        categoryId: productDetail.categoryId,
        _id: { $ne: productDetail._id }, // exclude the current product
      }).lean();

      // 3. Attach them dynamically
      return res.status(200).json({
        ...productDetail,
        relatedProducts, 
      });
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    return res.status(500).json({ message: "Failed to fetch product detail", error });
  }
}