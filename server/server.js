const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors=require('cors')

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
     cors: { origin: "*" }
});
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