const express = require("express");

const partRouter = require("./routes/partRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/parts", partRouter);
// app.use("/api/v1/producers", makerRouter);
// app.use("/api/v1/suppliers", suplierRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: `'Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
