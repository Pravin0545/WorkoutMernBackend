const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

// Express App
const app = express();
const PORT = process.env.PORT;
const MONGODB_CON = process.env.MONG_URI;
const workOutRoutes = require("./Routes/workouts");
const userRoutes = require("./Routes/user");

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//connection to db

mongoose
  .connect(MONGODB_CON)
  .then(() => {
    // Listen for request

    app.listen(PORT, () => {
      console.log(`connected to db & Listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

//Route Handler

app.use("/api/workouts", workOutRoutes);
app.use("/api/user", userRoutes);
