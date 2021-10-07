import express from "express";
import { DeleteProductCategoryView, getallProductCategoryView, postProductBrandView, UpdateSingleProductView } from "../../view/CategoryView";
import adminAuth from "./../../middlewares/adminAuth";
 
const categoryRouter = express.Router();

categoryRouter.get("/category", getallProductCategoryView);
categoryRouter.delete("/category/:id", adminAuth, DeleteProductCategoryView);
categoryRouter.put("/category/:id", adminAuth, UpdateSingleProductView);
categoryRouter.post("/category", adminAuth, postProductBrandView);

export default categoryRouter;
