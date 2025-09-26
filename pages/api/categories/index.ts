import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Category from "@/models/Category";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    if (req.method === "GET") {
      // Fetch all categories
      const categories = await Category.find().lean();
      return res.status(200).json(
        categories.map((cat) => ({
          id: cat._id.toString(),
          categoryId :cat.id,
          name: cat.name,
          description: cat.description,
          image: cat.image,
        }))
      );
    }

    if (req.method === "POST") {
      const { name, image, description } = req.body;
      if (!name || !image) {
        return res.status(400).json({ message: "Name and image are required" });
      }
      const newCategory = await Category.create({ name, image, description });
      return res.status(201).json(newCategory);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Category API error:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
}