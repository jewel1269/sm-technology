import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cors());





app.listen(port, () => {
  console.log(`SM-Technology server at running port: http://localhost:${port}`);
});
