import { ObjectId } from "mongodb";
import FriendsModel from "../../model/FriendModel";
import UserModel from "../../model/UserModel";

export const postFriendRequestView = async (req, res) => {
  const id = req.params.id;
  const query = await FriendsModel.findOne({ userId: req.id, friendId: id });

  console.log(query);
  if (query) {
    return await res.status(200).json({ message: "Friend already exists!" });
  }

  try {
    const request = new FriendsModel({
      userId: req.id,
      friendId: id,
    });
    await request.save();

    const requested = new FriendsModel({
      userId: id,
      friendId: req.id,
      status: 'requested',
    });

    await requested.save();

    await res.status(200).json({
      message: "Friend  request  is   successfully!",
      request,
      requested,
    });
  } catch (err) {
    console.log(err);
    await res.send(err);
  }
};

export const getFriendsView = async (req, res) => {
  try {
    const friends = await FriendsModel.find({
      userId: ObjectId(req.id),
      status: "friend",
    }).populate("friendId")

    await res.send({
      friends,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const getRequestView = async (req, res) => {
  try {
    const friendRequest = await FriendsModel.find({
      userId: ObjectId(req.id),
      status: "request",
    }).populate("friendId");
    await res.send({
      friendRequest,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const getRequestedView = async (req, res) => {
  try {
    const friendRequested = await FriendsModel.find({
      userId: ObjectId(req.id),
      status: "requested",
    }).populate("friendId")
    await res.send({
      friendRequested,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const getBlockView = async (req, res) => {
  try {
    const block = await FriendsModel.find({
      userId: ObjectId(req.id),
      status: "block",
    });
    await res.send({
      block,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const UnFriendView = async (req, res) => {
  try {
    const id = req.params.id;
    const unfriend = await FriendsModel.deleteOne({
      userId: ObjectId(req.id),
      friendId: ObjectId(id),
    });
    const unfriend2 = await FriendsModel.deleteOne({
      userId: ObjectId(id),
      friendId: ObjectId(req.id),
    });

    await res.status(200).json({unfriend, unfriend2});
  } catch (err) {
    await res.send(err);
  }
};

export const UpdateFriendRequestView = async (req, res) => {
  try {
    const id = req.params.id;
    const friend = await FriendsModel.updateOne(
      { userId: ObjectId(req.id), friendId: ObjectId(id) },
      { status: "friend" }
    );

    const friend2 = await FriendsModel.updateOne(
      { userId: ObjectId(id), friendId: ObjectId(req.id) },
      { status: "friend" }
    );


    await res.send({friend, friend2});
  } catch (err) {
    await res.send(err);
  }
};

 

export const SearchPeople = async (req, res) => {
  try {
    const search = req.params.search;
    const users = await UserModel.find({ name: { $regex: search } }).exec();
    res.status(200).json({ users });
  } catch {
    res.status(400).json({ message: "bad Request" });
  }
};
