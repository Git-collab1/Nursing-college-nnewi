const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://anointed08:Legendcollege@cluster0.t5yozhf.mongodb.net/?appName=Cluster0");
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;