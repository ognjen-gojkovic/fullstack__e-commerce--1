require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const cloudinary = require("cloudinary");

/**
 * @desc
 * handle uncought exception
 * run it before connecting to DB
 */
process.on("uncaughtException", (err) => {
  console.log("Shutting down server due uncaught exception.");
  console.log(`Error: ${err.stack}`);

  process.exit(1);
});

const connectDb = require("./config/ConnectDB");

/**
 * @desc
 * connect database
 */
connectDb();
const app = express();

/**
 * @desc
 * setup cloudinary config
 */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

/**
 * @desc
 * core middleware
 */

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:5000"],
  })
);
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api", require("./routers/Router.Auth"));
app.use("/api", require("./routers/Router.Product"));
app.use("/api", require("./routers/Router.Upload"));
app.use("/api", require("./routers/Router.Order"));
app.use("/api", require("./routers/Router.Payment"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
  console.log("NODE_ENV:", process.env.NODE_ENV);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("Logged error: ", err);
  server.close(() => process.exit(1));
});
3;
