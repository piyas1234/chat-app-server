import express from "express";
import userRouter from "./UserRoutes";
import profileRouter from "./UserRoutes/ProfileRoute";
import brandRouter from "./BrandRoute/index";
import categoryRouter from "./CategoryRoute";
import productRouter from "./ProductRoute/index";
import cartRouter from "./CartRoute/index";
import orderRouter from "./OrderRoute/index";

const router = express();
router.use("/auth", userRouter);
router.use("/user", profileRouter);
router.use("/product", brandRouter);
router.use("/product", categoryRouter);
router.use("/product", productRouter);
router.use("/product", cartRouter);
router.use("/product", orderRouter);

export default router;
