import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Product, { IProduct } from "@/models/Product";
import { FilterQuery } from "mongoose";
import { uploadImage } from "@/middleware/upload";
import { runMiddleware } from "@/middleware/runMiddleWare";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

interface ExtendedRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

export default async function handler(
  req: ExtendedRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    // GET — fetch all products or by category
    if (req.method === "GET") {
      const { category } = req.query;
      const filter: FilterQuery<IProduct> = {};

      if (category) filter.categoryId = category as string;

      const products = await Product.find(filter).lean();
      return res.status(200).json(products);
    }

    // POST — create new product
    if (req.method === "POST") {
      await runMiddleware(req, res, uploadImage("image")[0]);
      await runMiddleware(req, res, uploadImage("image")[1]);

      const {
        name,
        description,
        price,
        categoryId,
        rating,
        reviewsCount,
        discount,
        hasDiscount,
      } = req.body;

      if (!name || !price || !categoryId) {
        return res
          .status(400)
          .json({ message: "Name, price and categoryId are required" });
      }

      const newProduct = new Product({
        id: uuidv4(),
        name,
        description: description || "",
        price,
        categoryId,
        rating: rating || "0",
        reviewsCount: reviewsCount ? Number(reviewsCount) : 0,
        discount: discount || null,
        hasDiscount: hasDiscount === "true" || false,
        image: req.file?.cloudinaryUrl || "",
        imagePublicId: req.file?.cloudinaryPublicId || "",
      });

      await newProduct.save();
      return res.status(201).json(newProduct);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ message: "Server error", error: String(error) });
  }
}