const express = require("express");

const partRouter = require("./routes/partRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/parts", partRouter);

module.exports = app;
