const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./utils/dbConnect");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(
  cors({
    origin: "",
    credentials: true,
  })
);
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  await dbConnect();
  console.log("server is runnig");
});
