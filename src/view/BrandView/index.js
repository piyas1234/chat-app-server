import { ObjectId } from "mongodb"; 
import BrandModel from "./../../model/BrandModel/index";

export const getallProductBrandView = async (req, res) => {
  try {
    const brand = await BrandModel.find({}).sort({ date: -1 }).exec();
    await res.send({
      brand,
    });
  } catch (err) {
    await res.send(err);
  }
  
};

export const DeleteProductBrandView = async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await BrandModel.deleteOne({ _id: ObjectId(id) });
    await res.send(brand);
  } catch (err) {
    await res.send(err);
  }
};
 
export const UpdateSingleProductView = async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await BrandModel.updateOne(
      { _id: ObjectId(id) },
      req.body
    );
    await res.send(brand);
  } catch (err) {
    await res.send(err);
  }
};

export const postProductBrandView = async (req, res) => {
  try {
    const brand = new BrandModel(req.body);
    await brand.save();

    await res.status(200).json({
      message: "Brand is Created successfully!",
      brand: brand,
    });
  } catch (err) {
    await res.send(err);
  }
};
