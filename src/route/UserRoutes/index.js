import express from "express";
import auth from './../../middlewares/auth';
import adminAuth from './../../middlewares/adminAuth';
import {
  getUserView,
  postUserView,
  getAllUsersView,
  getSingleUserView,
  DeleteSingleUserView,
  UpdateSingleUsers,
  getOwnUserView,
  DeleteOwnUserView,
  UpdateOwnUsers,
} from "./../../view/UserView/index.js";

const userRouter = express.Router();

userRouter.post("/login", getUserView);
userRouter.post("/signup", postUserView);
userRouter.get("/users", adminAuth, getAllUsersView);
userRouter.get("/user/:id", adminAuth,  getSingleUserView);
userRouter.get("/user", auth,  getOwnUserView);
userRouter.delete("/user/:id", adminAuth, DeleteSingleUserView);
userRouter.delete("/user", auth, DeleteOwnUserView);
userRouter.put("/user/:id", adminAuth, UpdateSingleUsers);
userRouter.put("/user", auth, UpdateOwnUsers);

export default userRouter;
