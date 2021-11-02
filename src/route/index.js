import express from "express";
import friendRouter from "./FriendRoute";
import messageRouter from "./MessageRoute";
import userRouter from "./UserRoutes";
import profileRouter from "./UserRoutes/ProfileRoute";
 

const router = express();
router.use("/auth", userRouter);
router.use("/user", profileRouter);
router.use("/friend", friendRouter);
router.use("/message", messageRouter);

export default router;
