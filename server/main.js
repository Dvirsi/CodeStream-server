require("./configs/database");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { mentorConnection } = require("./models/codeTaskBL");
const path = require("path");

const codeTaskRouter = require("./routers/codeTaskRouter");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/api/code", codeTaskRouter);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://code-sharer-moveo.netlify.app"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", async (data) => {
    socket.join(data);
    const usersInRoom = io.sockets.adapter.rooms.get(data).size;
    if (usersInRoom == 1) {
      await mentorConnection(data, socket.id);
      socket.to(data.room).emit("receive_mentor", data);
    }
  });
  socket.on("send_message", (data) => {
    if (io.sockets.adapter.rooms.get(data.room)) {
      socket.to(data.room).emit("receive_message", data);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
