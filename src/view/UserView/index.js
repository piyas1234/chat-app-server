
import UserModel from "../../model/UserModel";
import Boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import { ObjectId } from "bson";
import jwt from "jsonwebtoken";

const saltRounds = 10;

//login user
export const getUserView = (req, res) => {
  UserModel.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send({ message: "email is invalid!" });

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ message: "password is wrong!" });

    var token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "30 days", // expires in 24 hours
      }
    );

    res
      .status(200)
      .send({
        message: `${user.name} are loggedin successfully!`,
        auth: true,
        token: token,
        role: user.role,
        user: user,
      });
  });
};







//create a user view
export const postUserView = async (req, res, next) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = await new UserModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashPassword,
    });
    await user.save();
    await res.status(200).json({ message: "User was Create successfully!" });
  } catch (err) {
    return next(Boom.badRequest(err));
  }
};





export const getAllUsersView = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const users = await UserModel.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await UserModel.countDocuments();
    await res.send({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return next(Boom.badRequest(err.message));
  }
};

export const getSingleUserView = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await UserModel.find({ _id: ObjectId(id) });
    await res.send(user);
  } catch (err) {
    return next(Boom.badRequest(err.message));
  }
};

export const getOwnUserView = async (req, res, next) => {
  try {
    const user = await UserModel.find({ _id: ObjectId(req.id) });
    await res.send(user);
  } catch (err) {
    return next(Boom.badRequest(err.message));
  }
};

export const DeleteSingleUserView = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserModel.deleteOne({ _id: ObjectId(id) });
    await res.send(user);
  } catch (err) {
    return await next(Boom.badRequest(err.message));
  }
};


export const DeleteOwnUserView = async (req, res, next) => {
  try {
   
    const user = await UserModel.deleteOne({ _id: ObjectId(req.id) });
    await res.send(user);
  } catch (err) {
    return await next(Boom.badRequest(err.message));
  }
};



export const UpdateSingleUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await UserModel.updateOne({ _id: ObjectId(id) }, req.body);
    await res.send(response);
  } catch (err) {
    return next(Boom.badRequest(err.message));
  }
};


export const UpdateOwnUsers = async (req, res, next) => {
  try {
    
    const response = await UserModel.updateOne({ _id: ObjectId(req.id) }, req.body);
    await res.send(response);
  } catch (err) {
    return next(Boom.badRequest(err.message));
  }
};

