import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Category from "@/models/Category";
import upload from "@/middleware/upload";
import cloudinary from "@/utils/cloudinary";

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Extend NextApiRequest to include Multer file
interface MulterNextApiRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

// Explicit handler type
type MethodHandler = (req: MulterNextApiRequest, res: NextApiResponse) => void | Promise<void>;

// Utility to run upload middleware
const runWithUpload = (
  req: MulterNextApiRequest,
  res: NextApiResponse,
  methodHandler: MethodHandler
) => {
  const multerMiddleware = upload.single("image");

  multerMiddleware(req as any, res as any, (err: unknown) => {
    if (err) {
      return res.status(500).json({ message: "Upload error", error: String(err) });
    }
    methodHandler(req, res);
  });
};

export default async function handler(req: MulterNextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  try {
    switch (req.method) {
      case "GET":
        if (id) {
          const category = await Category.findById(id).lean();
          if (!category) {
            return res.status(404).json({ message: "Category not found" });
          }
          return res.status(200).json({
            id: category._id.toString(),
            categoryId: category.id,
            name: category.name,
            description: category.description,
            image: category.image,
          });
        } else {
          const categories = await Category.find().lean();
          return res.status(200).json(
            categories.map((cat) => ({
              id: cat._id.toString(),
              categoryId: cat.id,
              name: cat.name,
              description: cat.description,
              image: cat.image,
            }))
          );
        }

      case "POST":
        return runWithUpload(req, res, async (req, res) => {
          const { name, description } = req.body;
          if (!name || !req.file) {
            return res.status(400).json({ message: "Name and image are required" });
          }

          // Upload to Cloudinary
          const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: "alx-project-assets/categories",
          });

          const newCategory = await Category.create({
            name,
            description,
            image: uploadResult.secure_url,
          });

          return res.status(201).json(newCategory);
        });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error: unknown) {
    console.error("Category API error:", error);
    return res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
}