import { Document, Schema, model, Model, Types } from "mongoose";
import { IProduct } from "./Product";

export interface ICartItem extends Document {
  product: Types.ObjectId | IProduct;
  quantity: number;
  price: number;
}

const CartItemSchema: Schema<ICartItem> = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const CartItem: Model<ICartItem> =
  (model<ICartItem>("CartItem") as Model<ICartItem>) ||
  model<ICartItem>("CartItem", CartItemSchema);

export default CartItem;