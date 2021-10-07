import mongoose from "mongoose";

// Product Schema
const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
    product: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const BrandModel = mongoose.model("Brand", brandSchema);

export default BrandModel;
