const express = require("express");
const _ = express.Router();
const apiRoutes = require("./api");
const baseUrl = process.env.BASE_URL;
_.use(baseUrl, apiRoutes);

_.use(baseUrl, (req, res) => {
  res.json({ error: "route not found" });
});

module.exports = _;
