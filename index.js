const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();

const errorMiddleware = require("./middleware/error.js");
const auth = require("./routes/auth.js");

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

app.use("/auth", auth);

app.use(errorMiddleware);

app.listen(PORT, () => console.log("server is working"));
