// models/Category.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
  description?: string;
}

const CategorySchema: Schema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;