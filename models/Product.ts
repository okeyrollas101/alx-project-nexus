import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
   _id: string;
  id: string;
  image: string;
  name: string;
  description: string;
  price: string;
  rating: string;
  reviewsCount: number;
  discount?: string;
  hasDiscount: boolean;
  categoryId: string;
  stock?: number;
  imagePublicId?: string; 
  gallery?: string[];
  relatedProducts?: any[];
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    id: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    imagePublicId: { type: String }, // ✅ add this
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    rating: { type: String, required: true },
    reviewsCount: { type: Number, required: true },
    discount: { type: String },
    hasDiscount: { type: Boolean, required: true },
    categoryId: { type: String, ref: "Category", required: true },
    stock: { type: Number },
    gallery: { type: [String] },
    relatedProducts: { type: [Schema.Types.Mixed] },
  },
  {
    timestamps: true,
  }
);


const Product: Model<IProduct> = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;