import express from "express";
import adminAuth from "./../../middlewares/adminAuth";
import {
  DeleteProductBrandView,
  getallProductBrandView,
  postProductBrandView,
  UpdateSingleProductView,
} from "../../view/BrandView";

const brandRouter = express.Router();

brandRouter.get("/brand", getallProductBrandView);
brandRouter.delete("/brand/:id", adminAuth, DeleteProductBrandView);
brandRouter.put("/brand/:id", adminAuth, UpdateSingleProductView);
brandRouter.post("/brand", adminAuth, postProductBrandView);

export default brandRouter;
