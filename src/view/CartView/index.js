import { ObjectId } from "mongodb";
import CartModel from "./../../model/CartModel/index";

export const getallCartView = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const cart = await CartModel.find({})
      .populate("product")
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await CartModel.countDocuments();
    await res.send({
      cart,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const getUserCartView = async (req, res) => {
  try {
    const cart = await CartModel.find({ user: ObjectId(req.id) })
      .populate("product")
      .sort({ date: -1 })
      .exec();
    await res.send({
      cart,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const DeleteCartView = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await CartModel.deleteOne({ _id: ObjectId(id) });
    await res.send(cart);
  } catch (err) {
    await res.send(err);
  }
};

export const DeleteUserCartView = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await CartModel.deleteOne({
      _id: ObjectId(id),
      user: ObjectId(req.id),
    });
    await res.send(cart);
  } catch (err) {
    await res.send(err);
  }
};

export const UpdateCartView = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await CartModel.updateOne({ _id: ObjectId(id) }, req.body);
    await res.send(cart);
  } catch (err) {
    await res.send(err);
  }
};

export const UpdateUserCartView = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await CartModel.updateOne(
      { _id: ObjectId(id), user: ObjectId(req.id) },
      req.body
    );
    await res.send(cart);
  } catch (err) {
    await res.send(err);
  }
};

export const postCartView = async (req, res) => {
  try {
    const cart = new CartModel({ user: req.id, ...req.body });
    await cart.save();

    await res.status(200).json({
      message: "Cart is Created successfully!",
      cart: cart,
    });
  } catch (err) {
    await res.send(err);
  }
};
