import { ObjectId } from "mongodb"; 
import CategoryModel from './../../model/CategoryModel/index';
 
export const getallProductCategoryView = async (req, res) => {
  try {
    const category = await CategoryModel.find({}).sort({ date: -1 }).exec();
    await res.send({
        category,
    });
  } catch (err) {
    await res.send(err);
  }
};

export const DeleteProductCategoryView = async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await CategoryModel.deleteOne({ _id: ObjectId(id) });
    await res.send(brand);
  } catch (err) {
    await res.send(err);
  }
};
 
export const UpdateSingleProductView = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await CategoryModel.updateOne(
      { _id: ObjectId(id) },
      req.body
    );
    await res.send(category);
  } catch (err) {
    await res.send(err);
  }
};

export const postProductBrandView = async (req, res) => {
  try {
    const category = new CategoryModel(req.body);
    await category.save();

    await res.status(200).json({
      message: "Category is Created successfully!",
      category: category,
    });
  } catch (err) {
    await res.send(err);
  }
};
