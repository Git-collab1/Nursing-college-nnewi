const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

// ----------------- MIDDLEWARE -----------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session setup
app.use(session({
  secret: "secretKey123", // replace with env variable in production
  resave: false,
  saveUninitialized: false
}));

// ----------------- DATABASE -----------------
connectDB();

// ----------------- ROUTES -----------------
const pageRoute = require("./routes/page"); // home page with register/login links
const studentRoute = require("./routes/student"); // register/login/logout/dashboard
const admissionRoute = require("./routes/admission"); // admission form
const paymentRoute = require("./routes/payment"); // payment form
const adminRoutes = require("./routes/admin");


app.use("/", pageRoute);
app.use("/student", studentRoute);
app.use("/admission", admissionRoute);
app.use("/payment", paymentRoute);
app.use("/admin", adminRoutes);

// ----------------- START SERVER -----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
