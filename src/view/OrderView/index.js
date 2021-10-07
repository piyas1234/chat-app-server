import { ObjectId } from "mongodb";
import CartModel from "./../../model/CartModel/index";
import OrderModel from "./../../model/OrderModel/index";

export const getallOrderView = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const cart = await OrderModel.find({})
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await OrderModel.countDocuments();
    await res.send({
      cart,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const getUserOrderView = async (req, res) => {
  try {
    const cart = await CartModel.find({ user: ObjectId(req.id) })
      .sort({ date: -1 })
      .exec();
    await res.send({
      cart,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const DeleteOrderView = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.deleteOne({ _id: ObjectId(id) });
    await res.send(order);
  } catch (err) {
    await res.send(err);
  }
};

export const DeleteUserOrderView = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.deleteOne({
      _id: ObjectId(id),
      user: ObjectId(req.id),
    });
    await res.send(order);
  } catch (err) {
    await res.send(err);
  }
};

export const UpdateOrderView = async (req, res) => {
  try {
    const id = req.params.id;
    const cart = await OrderModel.updateOne({ _id: ObjectId(id) }, req.body);
    await res.send(cart);
  } catch (err) {
    await res.send(err);
  }
};

export const UpdateUserOrderView = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await OrderModel.updateOne(
      { _id: ObjectId(id), user: ObjectId(req.id) },
      {status:req.body.status}
    );
    await res.send(order);
  } catch (err) {
    await res.send(err);
  }
};

export const postUserOrderView = async (req, res) => {
  try {
    const order = new OrderModel({ user: req.id, ...req.body });
    await order.save();

    await res.status(200).json({
      message: "Order is successfully Done!",
      order: order,
    });
  } catch (err) {
    await res.send(err);
  }
};
