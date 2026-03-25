import { dbService } from "./thridpartyServices";
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors=require('cors')
import { database } from "./services/db";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
     cors: { origin: "*" }
});
io.use((socket,next)=>{
  const token=socket.handshake.auth.token;
  let id;
  let name;
  if(!token){
    return  next(new Error("no token"))
  }
  try{
      database.getuser(token).then((uid)=>(id=uid)).catch(error=>console.log(error));
      database.findName(uid).then((nme)=>(name=nme)).catch(error=>console.log(error))
      socket.name=name;
      next();
  }catch(error){
    ne
  }
})
let players=[];
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
      socket.emit("players:update", players);
       socket.on("player:add", (data) => {
    console.log("Received:", data);

    players.push(data);
    console.log(players)

    io.emit("players:update", players);
  });


});
httpServer.listen(3000,()=>{
    console.log("server is listening ")
});