const express = require("express");
const { router } = require("./routes/authRoute");
const { connection } = require("./config/db");
const { requireSignin, checkRole } = require("./middlewares/atuhMiddleware");
const cors = require("cors"); 
const { categoryrouter } = require("./routes/catrgoryRoute");
const { productRouter } = require("./routes/productRoute");

const app = express();
require('dotenv').config();

app.use(express.json());

app.use(
  cors()
);

const port = process.env.PORT; // Use uppercase PORT

app.use("/api/", router);
app.use("/api/category/",categoryrouter)
app.use("/api/product/",productRouter)

app.get("/test", requireSignin, checkRole, (req, res) => {
  try {
    res.send("Welcome");
  } catch (error) {
    console.log("Error");
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (error) {
    console.log("Error occurred");
  }
  console.log(`Running on ${port}`);
});
