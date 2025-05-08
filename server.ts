import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./src/middlewares/error.middleware";
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());
app.use(errorMiddleware);






app.listen(port, () => {
  console.log(`SM-Technology server at running port: http://localhost:${port}`);
});
