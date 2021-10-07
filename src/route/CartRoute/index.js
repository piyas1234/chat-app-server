import express from "express";
import { DeleteCartView, DeleteUserCartView, getallCartView, getUserCartView, postCartView, UpdateCartView, UpdateUserCartView } from "../../view/CartView";
import adminAuth from "./../../middlewares/adminAuth";
import auth from './../../middlewares/auth';
 

const cartRouter = express.Router();

cartRouter.get("/admincart",adminAuth, getallCartView);
cartRouter.delete("/admincart/:id",adminAuth, DeleteCartView);
cartRouter.put("/admincart/:id",adminAuth, UpdateCartView);
cartRouter.get("/usercart",auth, getUserCartView);
cartRouter.delete("/usercart/:id",auth, DeleteUserCartView);
cartRouter.put("/usercart/:id",auth, UpdateUserCartView);
cartRouter.post("/usercart",auth, postCartView);
 

export default cartRouter;
