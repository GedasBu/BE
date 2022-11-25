const express = require("express");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const partRouter = require("./routes/partRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/parts", partRouter);
// app.use("/api/v1/producers", makerRouter);
// app.use("/api/v1/suppliers", suplierRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`'Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
