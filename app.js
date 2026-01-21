const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const itemRouter = require("./routes/clothingItems");

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

mongoose.connect("mongodb://localhost:27017/wtwr_db").then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
});
