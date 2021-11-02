import mongoose from "mongoose";

// User Schema//
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    facebookLink: String,
    instaLink: String,
    twitterLink: String,

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ProfileModel = mongoose.model("profile", profileSchema);

export default ProfileModel;
