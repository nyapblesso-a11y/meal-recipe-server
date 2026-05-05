import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import indexRouter from "./routes/index.js";
import uploadRouter from "./routes/uploadRouter.js";
import recipeRouter from "./routes/recipeRoutes.js";

const app = express();


// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       // "https://your-frontend-domain.vercel.app",
//     ],
//     credentials: true,
//   })
// );

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES
app.use("/", indexRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/recipes", recipeRouter);

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log("🔥 GLOBAL ERROR:", err); // VERY IMPORTANT

  res.status(err.status || 500).json({
    error: err.message,
    stack: err.stack,
  });
});

export default app;