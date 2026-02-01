const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", routes);

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
