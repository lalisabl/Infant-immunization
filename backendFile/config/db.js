const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:\n", error);
  });

module.exports = mongoose;
