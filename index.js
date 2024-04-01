const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./utils/dbConnect");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(routes);
app.get("/", function (req, res) {
  res.send("Hello World Server health is ok ");
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log("server is runnig");
});
