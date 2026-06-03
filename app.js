import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";
import uploadRouter from "./routes/uploadRouter.js";
import recipeRouter from "./routes/recipeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


// MUST BE FIRST
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));


// MUST HANDLE PREFLIGHT
app.options("*", cors());


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/uploads", express.static(
  path.join(__dirname, "uploads")
));

app.use("/", indexRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/recipes", recipeRouter);


app.use((req,res,next)=>{
  next(createError(404));
});


app.use((err,req,res,next)=>{
  console.log("🔥 ERROR:", err);

  res.status(err.status || 500).json({
    error: err.message
  });
});

export default app;