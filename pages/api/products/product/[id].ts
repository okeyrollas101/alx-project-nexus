import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Product, { IProduct } from "@/models/Product";
import { uploadImage } from "@/middleware/upload";
import { runMiddleware } from "@/middleware/runMiddleWare";
import ProductDetail, { IProductDetail } from "@/models/ProductDetail";

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
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

  const { id } = req.query;

  if (!id) return res.status(400).json({ message: "Product ID required" });

  // GET — Get single product
  if (req.method === "GET") {
    try {
      // Step 1 — Find main product by MongoDB _id
      const product = await Product.findById(id).lean();
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Step 2 — Find product detail using product.id
      const productDetail = await ProductDetail.findOne({ id: product.id })
        .populate("relatedProducts")
        .lean<IProductDetail>();

      if (!productDetail) {
        return res.status(404).json({ message: "Product detail not found" });
      }

      // Step 3 — Fetch related products from same category
      const relatedProducts: IProduct[] = await Product.find({
        categoryId: productDetail.categoryId,
        _id: { $ne: product._id }, // exclude the current product
      }).lean();

      // Step 4 — Return everything
      return res.status(200).json({
        product,
        productDetail: {
          ...productDetail,
          relatedProducts,
        },
      });
    } catch (error) {
      console.error("GET product error:", error);
      return res.status(500).json({ message: "Failed to get product", error });
    }
  }

  // PUT — Update product with optional file upload
  if (req.method === "PUT") {
    try {
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

      const updateData: Partial<IProduct> = {
        name,
        description,
        price,
        categoryId,
        rating,
        reviewsCount,
        discount,
        hasDiscount,
      };

      if (req.file?.cloudinaryUrl) {
        updateData.image = req.file.cloudinaryUrl;
        updateData.imagePublicId = req.file.cloudinaryPublicId;
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Update error:", error);
      return res
        .status(500)
        .json({ message: "Failed to update product", error });
    }
  }

  // DELETE — Delete product
  if (req.method === "DELETE") {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct)
        return res.status(404).json({ message: "Product not found" });
      return res
        .status(200)
        .json({ message: "Product deleted", deletedProduct });
    } catch (error) {
      console.error("Delete error:", error);
      return res
        .status(500)
        .json({ message: "Failed to delete product", error });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}