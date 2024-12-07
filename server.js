const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersRoutes = require("./routes/UserRoutes");
const connectDB = require("./config/db");
const PORT = 5000;

connectDB();
const app = express();

app.use(express.json());
 app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to my seccond project");
});

app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
