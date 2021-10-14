import express from "express";
import userRouter from "./UserRoutes";
import profileRouter from "./UserRoutes/ProfileRoute";
 

const router = express();
router.use("/auth", userRouter);
router.use("/user", profileRouter);
 

export default router;
