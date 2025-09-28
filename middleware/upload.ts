import multer from "multer";
import path from "path";
import { Request } from "express";
import cloudinary from "@/utils/cloudinary";

declare global {
  namespace Express {
    namespace Multer {
      interface File {
        cloudinaryUrl?: string;
        cloudinaryPublicId?: string;
      }
    }
  }
}

// Temporary storage config
const storage = multer.diskStorage({
  destination: "/tmp",
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/**
 * Middleware to handle single image upload to Cloudinary
 * @param fieldName - name of the form field containing the file
 */
export function uploadImage(fieldName: string) {
  return [
    upload.single(fieldName),
    async (req: Request & { file?: Express.Multer.File }, res: any, next: any) => {
      if (!req.file) {
        return next();
      }

      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "alx-project-assets/categories",
        });

        // Attach the Cloudinary URL and public ID to the request object
        req.file.cloudinaryUrl = result.secure_url;
        req.file.cloudinaryPublicId = result.public_id;

        next();
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: "Image upload failed", error });
      }
    },
  ];
}

export default upload;