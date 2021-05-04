const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const habitsRouter = require("./routes/habits");
const usersRouter = require("./routes/users");

app.use("/habits", habitsRouter);
app.use("/users", usersRouter);

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
    socket.on("answerCall", (data) => {
      io.to(data.to).emit("callAccepted", data.signal);
    });
  });
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// connect("$TOKEN", { name: "my-new-room" }).then(
//   (room) => {
//     console.log(`Successfully joined a Room: ${room}`);
//     room.on("participantConnected", (participant) => {
//       console.log(`A remote Participant connected: ${participant}`);
//     });
//   },
//   (error) => {
//     console.error(`Unable to connect to Room: ${error.message}`);
//   }
// );
