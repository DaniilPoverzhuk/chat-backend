const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

const errorMiddleware = require("./middleware/error.js");

const auth = require("./routes/auth.js");
const upload = require("./routes/upload.js");
const token = require("./routes/token.js");

app.use(express.json());
app.use(
  cors({
    origin: process.env.BASE_CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use("/uploads/avatars", express.static("uploads/avatars"));

app.use("/auth", auth);
app.use("/token", token);
app.use("/upload", upload);

app.use(errorMiddleware);

app.listen(PORT, () => console.log("server is working"));
