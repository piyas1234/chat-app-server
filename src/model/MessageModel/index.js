import mongoose from "mongoose";

// User Schema//
const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friendId: {
      type: String,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now, required: true },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);

export default MessageModel;
