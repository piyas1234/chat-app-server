import mongoose from "mongoose";

// Product Schema
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    qty: { type: Number, required: [true, "Qty is required"], default: 1 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
