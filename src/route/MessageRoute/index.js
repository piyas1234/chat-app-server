import express from "express";
import auth from "../../middlewares/auth";
import { getMessageView, postMessageView } from "../../view/MessageView";
 
 

const messageRouter = express.Router();
 
messageRouter.post("/message/:id", auth, postMessageView);
messageRouter.get("/message/:id", auth, getMessageView);
 
 

export default messageRouter;
