import express from "express";
import auth from "./../../middlewares/auth";
import adminAuth from "./../../middlewares/adminAuth";
import {
  getProfileView,
  getSingleProfileView,
  DeleteSingleProfileView,
  UpdateSingleProfileView,
  postProfileView,
  DeleteOwnProfileView,
} from "./../../view/UserView/profileView";

const profileRouter = express.Router();

profileRouter.get("/allprofile", adminAuth, getProfileView);
profileRouter.get("/profile", auth, getSingleProfileView);
profileRouter.delete("/profile", auth, DeleteOwnProfileView);
profileRouter.delete("/profile/:id", adminAuth, DeleteSingleProfileView);
profileRouter.put("/profile", auth, UpdateSingleProfileView);
profileRouter.post("/profile", auth, postProfileView);

export default profileRouter;
