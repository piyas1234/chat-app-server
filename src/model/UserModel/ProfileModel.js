import mongoose from "mongoose";

// User Schema
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    deliveryadress: {
      type: Array,
      required: true,
    },

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model("profile", profileSchema);

export default ProfileModel;
