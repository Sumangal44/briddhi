import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import cloudinary from "./config/cloudinary.js";
import citizenRoutes from "./routes/citizenRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import { Server } from "socket.io";
import http from "http";

// app config
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST", "PUT"] } });

// attach io to app
app.set("io", io);

// socket.io connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", (userId) => socket.join(userId)); // citizen room
  socket.on("joinAdmin", () => socket.join("admins")); // admin room

  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

// middlewares
app.use(cors());
app.use(express.json());

// database & cloudinary
connectDB();
// cloudinary config is loaded by import, no need to call as function
// cloudinary config is loaded by import, no need to call as function

// routes
app.use("/api/citizen", citizenRoutes);
app.use("/api/admin", adminRoutes);

// default route
app.get("/", (req, res) => res.send("API is running..."));

// start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
