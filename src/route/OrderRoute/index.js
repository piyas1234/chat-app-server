import express from "express";
import { DeleteOrderView, DeleteUserOrderView, getallOrderView, getUserOrderView, postUserOrderView, UpdateOrderView, UpdateUserOrderView } from "../../view/OrderView";
import adminAuth from "./../../middlewares/adminAuth";
import auth from './../../middlewares/auth';
 
const orderRouter = express.Router();

orderRouter.get("/order",adminAuth, getallOrderView);
orderRouter.delete("/order/:id",adminAuth, DeleteOrderView);
orderRouter.put("/order/:id",adminAuth, UpdateOrderView);
orderRouter.get("/userorder",auth, getUserOrderView);
orderRouter.delete("/userorder/:id",auth, DeleteUserOrderView);
orderRouter.put("/userorder/:id",auth, UpdateUserOrderView);
orderRouter.post("/userorder/:id",auth, postUserOrderView);
 

export default orderRouter;
