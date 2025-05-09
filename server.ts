import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./src/middlewares/error.middleware";
import connectDB from "./src/config/db";
const app = express();
const port = process.env.PORT || 5000;
import userRoutes from "./src/routes/user.route";
import classRoutes from "./src/routes/class.route";
import authRoutes from "./src/routes/auth.route";

//middleware
app.use(express.json());
app.use(cors());
app.use(errorMiddleware);

connectDB();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/classes", classRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("SM-Technology Server is Running!");
});

app.listen(port, () => {
  console.log(`SM-Technology server at running port: http://localhost:${port}`);
});
