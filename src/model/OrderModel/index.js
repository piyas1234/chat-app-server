import mongoose from "mongoose";

// Product Schema
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cart: {
      type: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          qty: Number,
        },
      ],
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "verified", "delivered", "rejected","cancel"],
    },
    totalAmount: Number,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
