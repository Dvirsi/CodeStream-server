const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose.set("strictQuery", false);
mongoose.connect(uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection establish successfully");
});
