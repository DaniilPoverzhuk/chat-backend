const express = require("express");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

config();

const options = {
  socket: {
    cors: { origin: process.env.BASE_CLIENT_URL },
  },
  main: {
    origin: process.env.BASE_CLIENT_URL,
    credentials: true,
  },
};

const PORT = process.env.PORT || 5001;
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, options.socket);

const errorMiddleware = require("./middleware/error.js");

const auth = require("./routes/auth.js");
const upload = require("./routes/upload.js");
const token = require("./routes/token.js");
const users = require("./routes/user.js");

const { connect: connectSocket } = require("./socket/index.js");

io.on("connection", (socket) => connectSocket(io, socket));

app.use(express.json());
app.use(cors(options.main));
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use("/uploads/avatars", express.static("uploads/avatars"));

app.use("/auth", auth);
app.use("/token", token);
app.use("/users", users);
app.use("/upload", upload);

app.use(errorMiddleware);

server.listen(PORT, () => console.log("server is working"));
