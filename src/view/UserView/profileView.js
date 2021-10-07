import { ObjectId } from "mongodb";
import ProfileModel from "./../../model/UserModel/ProfileModel";
import UserModel from "./../../model/UserModel";

export const getProfileView = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const profiles = await ProfileModel.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await ProfileModel.countDocuments();
    await res.send({
      profiles,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const getSingleProfileView = async (req, res) => {
  try {
    const id = req.id;
    const profile = await ProfileModel.find({ user: ObjectId(id) });
    await res.send(profile);
  } catch (err) {
    await res.send(err);
  }
};

export const DeleteSingleProfileView = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await ProfileModel.deleteOne({ user: ObjectId(id) });
    await res.send(profile);
  } catch (err) {
    await res.send(err);
  }
};


export const DeleteOwnProfileView = async (req, res) => {
    try {
      
      const profile = await ProfileModel.deleteOne({ user: ObjectId(req.id) });
      await res.send(profile);
    } catch (err) {
      await res.send(err);
    }
  };

export const UpdateSingleProfileView = async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await ProfileModel.updateOne(
      { user: ObjectId(id) },
      req.body
    );
    await res.send(profile);
  } catch (err) {
    await res.send(err);
  }
};

export const postProfileView = async (req, res) => {
  const query = await ProfileModel.findOne({ user: req.id });
  if (query) {
    return await res.status(200).json({ message: "Profile already exists!" });
  }
  try {
    const profile = new ProfileModel({ user: req.id, ...req.body });
    await profile.save();
    const user = await UserModel.updateOne(
      { _id: ObjectId(req.id) },
      {
        profile: profile._id,
      }
    );
    await res
      .status(200)
      .json({
        message: "Profile is Created successfully!",
        user: user,
        profile: profile,
      });
  } catch (err) {
    await res.send(err);
  }
};
