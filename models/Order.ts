import mongoose, { Schema, Document, Model } from "mongoose";
import { ICartItem } from "@/models/CartItem";
import { IUser } from "./User";

export interface IOrder extends Document {
  user: IUser["_id"];
  items: ICartItem[];
  subtotal: number;
  shipping: number; // numeric shipping cost
  tax: number;
  total: number;
  status: "pending" | "processing" | "paid" | "delivered" | "cancelled";
  paymentMethod: "Mobile money" | "Chapa" | "Credit Card" | "Cash on Delivery";
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    shipping: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "paid", "cancelled"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["Mobile money", "Chapa", "Credit Card", "Cash on Delivery"],
      default: "Chapa",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;