const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { authenticate } = require("./middleware/authenticate.middleware");
const { userRouter } = require("./routes/user.route");
const { calculateRouter} = require("./routes/calculate.route")

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Grow calculator");
});

app.use("/user", userRouter);
app.use(authenticate);
app.use("/calculate",calculateRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log("Server is running on port 7300");
});
