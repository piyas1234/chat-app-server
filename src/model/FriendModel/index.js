import mongoose from "mongoose";

// User Schema//
const friendsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friendId:{
        type:String,
        ref:'User',
        required: true,
    },
    status:{
        type:String,
        default:"request",
        enum:['request', 'requested','friend', 'block']
    },
    

    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const FriendsModel = mongoose.model("Friends", friendsSchema);

export default FriendsModel;
