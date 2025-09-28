import mongoose, { Schema, Document } from "mongoose";
import dayjs from "dayjs";

export interface IUser extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String},
  lastName: { type: String},
  status: { type: String, enum: ["active", "inactive","block","unblock"], default: "active" },
  role: { type: String, enum: ["client", "guest", "admin"], default: "guest" },
  createdAt: { type: Date, default: () => dayjs().toDate() },
  updatedAt: { type: Date, default: () => dayjs().toDate() },
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);