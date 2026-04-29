import createError  from'http-errors';
import express  from 'express' ;
import path  from 'path';
import cookieParser  from 'cookie-parser';
import logger  from 'morgan';
import indexRouter from'./routes/index.js';
import uploadRouter from './routes/uploadRouter.js';
import recipeRouter from './routes/recipeRoutes.js'
import { fileURLToPath } from "url";
import cors from "cors"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/', indexRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/recipes', recipeRouter)
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send({
    error: {
      status: statusCode,
      message: err.message,
      stack: req.app.get('env') === 'development' ? err.stack : {}
    }
  });
});

export default app;
