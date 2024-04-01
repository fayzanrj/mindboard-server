import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";
import express from "express";
import connectToMongo from "./db";
import groupRoutes from "./routes/GroupRoutes";
import userRoutes from "./routes/UserRoutes";
import boardRoutes from "./routes/BoardRoutes";
import { Server } from "socket.io";
import { createServer } from "http";

env.config();

const app = express();
const server = createServer(app);

// Initializing socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
  });
});

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1/user/", userRoutes);
app.use("/api/v1/group/", groupRoutes);
app.use("/api/v1/board/", boardRoutes);

connectToMongo();

server.listen(8080, () => {
  console.log("Server running");
});

export { app, io };
