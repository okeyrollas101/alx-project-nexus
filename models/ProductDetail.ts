// models/ProductDetail.ts
import mongoose, { Schema, Document, Model } from "mongoose";
import Product from "../models/Product";


export interface IProductDetail extends Document {
  categoryId: string;
  stock: number;
  gallery: string[];
  relatedProducts: mongoose.Types.ObjectId[]; // references other products
}

const ProductDetailSchema = new Schema<IProductDetail>(
  {
    ...Product.schema.obj,
    categoryId:{type:String,require: true},
    stock: { type: Number, required: true },
    gallery: [{ type: String, required: true }],
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

const ProductDetail: Model<IProductDetail> =
  mongoose.models.ProductDetail ||
  mongoose.model<IProductDetail>("ProductDetail", ProductDetailSchema);

export default ProductDetail;