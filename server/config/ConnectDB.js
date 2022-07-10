require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the database...");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDb;
