import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import itemRouter from "./routes/clothingItems.js";

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use("/", userRouter);
app.use("/", itemRouter);

app.use((req, res) => {
  res.status(404).send({
    message: "Requested resource not found",
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");
