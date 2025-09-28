import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import Wishlist from "@/models/Wishlist";
import Product from "@/models/Product";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  // Type assertion to include 'id' on user
  const userId = (session.user as typeof session.user & { id?: string })?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    if (req.method === "GET") {
      const wishlist = await Wishlist.findOne({ user: userId }).populate("products");
      return res.status(200).json(wishlist || { products: [] });
    }

    if (req.method === "POST") {
      const { productId } = req.body;

      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ message: "Product not found" });

      let wishlist = await Wishlist.findOne({ user: userId });
      
      if (!wishlist) {
        wishlist = new Wishlist({ user: userId, products: [productId] });
      } else {
        if (!wishlist.products.includes(productId)) {
          wishlist.products.push(productId);
        }
      }
      await wishlist.save();
      return res.status(201).json(wishlist);
    }

    if (req.method === "DELETE") {
      const { productId } = req.body;
      const wishlist = await Wishlist.findOneAndUpdate(
        { user: userId },
        { $pull: { products: productId } },
        { new: true }
      );
      return res.status(200).json(wishlist);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ message: `Server error: ${err}` });
  }
}