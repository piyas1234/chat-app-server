import express from "express";
import merchantAuth from "../../middlewares/marchentAuth";
import adminAuth from "./../../middlewares/adminAuth";
import {
  DeleteOwnProductView,
  DeleteSingleProductView,
  getallProductView,
  getCategoryProductView,
  getSingleProductView,
  postProductView,
  UpdateOwnProductView,
  UpdateSingleProductView,
} from "../../view/ProductView";

const productRouter = express.Router();
productRouter.get("/product", getallProductView);
productRouter.post("/product", merchantAuth, postProductView);
productRouter.get("/product/:id", getCategoryProductView);
productRouter.get("/singleproduct/:id", getSingleProductView);
productRouter.delete("/singleproduct/:id", adminAuth, DeleteSingleProductView);
productRouter.put("/singleproduct/:id", adminAuth, UpdateSingleProductView);
productRouter.delete("/ownproduct/:id", merchantAuth, DeleteOwnProductView);
productRouter.put("/ownproduct/:id", merchantAuth, UpdateOwnProductView);
export default productRouter;
