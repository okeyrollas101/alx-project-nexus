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
// Utility to run upload middleware
const runWithUpload = (req: NextApiRequest, res: NextApiResponse, methodHandler: Function) => {
  const multerMiddleware = upload.single("image");
  multerMiddleware(req as any, res as any, (err: any) => {
    if (err) return res.status(500).json({ message: "Upload error", error: err });
    methodHandler();
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  try {
    switch (req.method) {
      case "PUT":
        return runWithUpload(req, res, async () => {
          if (!id) {
            return res.status(400).json({ message: "Category ID is required" });
          }

          const category = await Category.findById(id);
          if (!category) {
            return res.status(404).json({ message: "Category not found" });
          }
          const updateData: any = { ...req.body };

          if ((req as any).file) {
            const uploadResult = await cloudinary.uploader.upload(
              (req as any).file.path,
              { folder: "alx-project-assets/categories" }
            );
            updateData.image = uploadResult.secure_url;
          }

          const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
          });

          if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
          }
          return res.status(200).json(updatedCategory);
        });

      case "DELETE":
        if (!id) {
          return res.status(400).json({ message: "Category ID is required" });
        }
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
          return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted successfully" });

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Category API error:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
}