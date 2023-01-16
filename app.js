const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const partRouter = require("./routes/partRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
//Set security HTTP headers
app.use(helmet());

// limits how many time data can be requested from same IP can connect

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Body parser, reading data from body into req.body with data limitation
app.use(express.json({ limit: "10kb" }));

// Data sanitization agaisnt NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS

app.use(xss());

// Prevent parameter polution, must whitelist all field on which we want to have double parameters
app.use(hpp({ whitelist: ["code", "number"] }));

app.use("/api/v1/parts", partRouter);
// app.use("/api/v1/producers", makerRouter);
// app.use("/api/v1/suppliers", suplierRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`'Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
