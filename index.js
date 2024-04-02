const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./utils/dbConnect");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");
const { GetTasksController } = require("./controller/TaskController");

app.use(
  cors({
    origin: "http://localhost:3000", // Specify the origin of your frontend application
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// app.use(routes);

app.get("/", function (req, res) {
  res.send("Hello World Server health is ok with cores");
});
app.get("/api/v1/task", GetTasksController);

app.listen(PORT, async () => {
  await dbConnect();
  console.log("Server is running");
});
