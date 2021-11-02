import express from "express";
import auth from "../../middlewares/auth";
import {
  getBlockView,
  getFriendsView,
  getRequestedView,
  getRequestView,
  postFriendRequestView,
  SearchPeople,
  UnFriendView,
  UpdateFriendRequestView,
} from "../../view/FriendView";

const friendRouter = express.Router();

friendRouter.post("/request/:id", auth, postFriendRequestView);
friendRouter.get("/friends", auth, getFriendsView);
friendRouter.get("/request", auth, getRequestView);
friendRouter.get("/requested", auth, getRequestedView);
friendRouter.get("/block", auth, getBlockView);
friendRouter.get("/unfriend/:id", auth, UnFriendView);
friendRouter.put("/accept/:id", auth, UpdateFriendRequestView);

friendRouter.get("/search/:search", auth, SearchPeople);

export default friendRouter;
