// pages/api/categories/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      // ✅ Find category by its categoryId (string like "cat-furniture")
      const category = await Category.findOne({ id }).lean();

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // ✅ Fetch products where product.categoryId matches category._id
      const products = await Product.find({ categoryId: category.id }).lean();

      return res.status(200).json({
        categoryName: category.name,
        categoryId: category.id,
        products,
      });
    } catch (error) {
      console.error("Error fetching category products:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}