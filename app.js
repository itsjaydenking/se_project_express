import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users";
import itemRouter from "./routes/clothingItems";

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "69646960aa4f356a23be16d8",
  };
  next();
});

app.use("/", userRouter);
app.use("/", itemRouter);

app.use((req, res) => {
  res.status(404).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
