import express from "express";
import bodyParser from "body-parser";
import notFound from "./src/middlewares/notFound";
import errorHandler from "./src/middlewares/errorHandler";
import router from "./src/route";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
import mongoose from "mongoose";
 import { users,addUser, removeUser } from "./src/socket/method";

const expressServer = http.createServer(app)
const io = new Server(expressServer)
 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);
app.get("/ping", (req, res, next) => {
  return res.json("ping:pong");
});
app.use("/",(req,res)=>{
  res.send({Page:"homePage"})
})
app.use(notFound);
app.use(errorHandler);

const nsp = io.of("");

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", ({user}) => {
     
    addUser(user);
    io.emit("getUsers", users);
  });
   

 
  //send and get message
  socket.on("sendMessage", ({ user, receiver, text }) => {

    const nspUser = io.of("namespace"+user._id);
    const nspReceiver  = io.of("namespace"+receiver._id);

     nspReceiver.on("connection", (socket)=>{
      socket.emit("getMessage", {
        user,
        receiver,
        text,
        id:socket.id
      });
     })

     nspUser.on("connection",(socket)=>{
      nspUser.emit("getMessage",{
        user,
        receiver,
        text,
        id:socket.id
      })
     })
     
  });


  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
 


dotenv.config();
mongoose.connect(
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_TEST_URI
    : process.env.MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);
mongoose.connection.once("open", () => {
  const port = process.env.PORT || 1000;
  expressServer.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
  
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});

console.log("hello");

export default app;
