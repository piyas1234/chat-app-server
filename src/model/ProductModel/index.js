import mongoose from "mongoose";

// Product Schema
const productSchema = new mongoose.Schema(
  {
    marchent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    title: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    image: {
      type: Array,
      required: [true, "Image is required"],
    },
    price: {
      type: String,
      required: [true, "Price is Required"],
    },
    discount: {
      type: String,
      required: [true, "Price is Required"],
    },
    love: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    description: {
      type: String,
      required: [true, "description is Required"],
    },

    spacification: {
      type: Array,
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
