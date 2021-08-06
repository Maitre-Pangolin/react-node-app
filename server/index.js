const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const PORT = process.env.PORT || 3001;

// EXPRESS

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.get("/api/generator", (req, res) => {
  res.json({ message: "An amazing React-Express App" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// SOCKET.IO

let user = 0;

io.on("connection", (socket) => {
  user++;
  console.log("Connection", `User : ${user}`);
  io.emit("user", { user });

  socket.on("disconnect", () => {
    user--;
    console.log(user);
    io.emit("user", { user });
  });

  socket.on("messaging", ({ message }) => {
    io.emit("new message", { data: message });
    console.log(message);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port : ${PORT}`);
});
