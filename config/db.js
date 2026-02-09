const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://anointedngonadi08_db_user:Legendcollege@cluster0.uradru0.mongodb.net/?appName=Cluster0");
    console.log("MongoDB connected");
  } catch (err) {
    console.log("MongoDB error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;