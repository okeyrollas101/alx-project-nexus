import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
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
  gallery?: string[];
  relatedProducts?: any[];
}

const ProductSchema: Schema<IProduct> = new Schema({
  id: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: String, required: true },
  reviewsCount: { type: Number, required: true },
  discount: { type: String },
  hasDiscount: { type: Boolean, required: true },
  categoryId: { type: String,ref: "Category", required: true },
},
{
    timestamps: true
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;