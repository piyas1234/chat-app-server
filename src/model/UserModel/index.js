import mongoose from "mongoose";
import validator from "validator";
// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: "Email Address is Already Registered!",
      required: [true, "Email is required"],
      trim: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: "Invalid Email address" });
        }
      },
    },
    phone: {
      type: String,
      unique: "Phone is Already Registered!",
      required: [true, "Phone number is required!"],
      minlength: [10, "Mobile number should be more than 10 number"],
      trim: true,
      validate: (value) => {
        if (!validator.isMobilePhone(value)) {
          throw new Error({ error: "Invalid Phone Number" });
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password should be greater than or equal 6 character!"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "merchant", "user"],
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },

    product: [
      { type: mongoose.Schema.Types.ObjectId,
        ref: "Product", },
    ],

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
