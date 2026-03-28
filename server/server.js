import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { database } from "./services/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/get-token", async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await database.loginUser(email, password);

    if (!data?.session?.access_token) {
      return res.status(401).json({ error: "Invalid login" });
    }

    const token = data.session.access_token;

    const userData = await database.getuser(token);
    const uid = userData.user.id;
    const name = await database.findName(uid);

    res.json({ token, name });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      socket.user = null;
      return next();
    }

    const data = await database.getuser(token);
    const uid = data.user.id;
    const name = await database.findName(uid);

    socket.user = { uid, name };

    next();
  } catch (err) {
    next(new Error("Unauthorized"));
  }
});

let players = [];

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("players:update", players);

  socket.on("update", (data) => {
    if (!socket.user) {
      console.log("Unauthorised user");
      return;
    }

    console.log("Received:", data);
    console.log("player updated by", socket.user.name);

    players.push(data);

    io.emit("players:update", players);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is listening");
});