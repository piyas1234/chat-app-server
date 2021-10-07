import { ObjectId } from "mongodb";
import ProfileModel from "./../../model/UserModel/ProfileModel";
import UserModel from "./../../model/UserModel";
import ProductModel from "./../../model/ProductModel";
import CategoryModel from "./../../model/CategoryModel/index";
import BrandModel from "./../../model/BrandModel/index";

export const getallProductView = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const product = await ProductModel.find({})
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await ProductModel.countDocuments();
    await res.send({
      product,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const getCategoryProductView = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const id = req.params.id; //category id
    const product = await CategoryModel.find({ _id: ObjectId(id) })
      .populate("product")
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await CategoryModel.find({ _id: ObjectId(id) })
      .populate("product")[0]
      .product.countDocuments();
    await res.send({
      product,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const getBrandProductView = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
      const id = req.params.id; //Brand id
      const product = await BrandModel.find({ _id: ObjectId(id) })
        .populate("product")
        .sort({ date: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      const count = await BrandModel.find({ _id: ObjectId(id) })
        .populate("product")[0]
        .product.countDocuments();
      await res.send({
        product,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (err) {
      await res.send(err);
    }
  };
  

export const getSingleProductView = async (req, res) => {
  try {
    const id = req.id;
    const product = await ProductModel.find({ _id: ObjectId(id) });
    await res.send(product);
  } catch (err) {
    await res.send(err);
  }
};

export const DeleteSingleProductView = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.deleteOne({ _id: ObjectId(id) });
    await res.send(product);
  } catch (err) {
    await res.send(err);
  }
};

export const DeleteOwnProductView = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.deleteOne({
      _id: ObjectId(id),
      marchent: ObjectId(req.id),
    });
    await res.send(product);
  } catch (err) {
    await res.send(err);
  }
};

export const UpdateOwnProductView = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.updateOne(
      { marchent: ObjectId(req.id), _id: ObjectId(id) },
      req.body
    );
    await res.send(product);
  } catch (err) {
    await res.send(err);
  }
};

export const UpdateSingleProductView = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.updateOne(
      { _id: ObjectId(id) },
      req.body
    );
    await res.send(product);
  } catch (err) {
    await res.send(err);
  }
};

export const postProductView = async (req, res) => {
  try {
    const product = new ProductModel({ marchent: req.id, ...req.body });
    await product.save();
    const user = await UserModel.updateOne(
      { _id: ObjectId(req.id) },
      {
        $push: {
          product: product,
        },
      }
    );

    const category = await CategoryModel.updateOne(
      { _id: ObjectId(req.body.categoryid) },
      {
        $push: {
          product: product,
        },
      }
    );

    const brand = await BrandModel.updateOne(
      { _id: ObjectId(req.body.brandid) },
      {
        $push: {
          product: product,
        },
      }
    );

    await res.status(200).json({
      message: "Product is Created successfully!",
      user: user,
      product: product,
      category: category,
      brand: brand,
    });
  } catch (err) {
    await res.send(err);
  }
};
