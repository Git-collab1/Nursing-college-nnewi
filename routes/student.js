const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Admission = require("../models/Admission");
const bcrypt = require("bcryptjs");
const isLoggedIn = require("../middleware/isLoggedIn");

/* ===== REGISTER ===== */
router.get("/register", (req, res) => {
  res.render("student-register");
});

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.send("Student already exists");

    const student = new Student({ fullName, email, password });
    await student.save();

    res.redirect("/student/login");
  } catch (err) {
    console.error("Registration failed:", err.message);
    res.send("Registration failed");
  }
});

/* ===== LOGIN ===== */
router.get("/login", (req, res) => {
  res.render("student-login");
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) return res.send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.send("Invalid credentials");

    // Set session
    req.session.studentId = student._id;

    // Check if student has already submitted admission
    const existingAdmission = await Admission.findOne({ studentId: student._id });

    if (!existingAdmission) {
      return res.redirect("/admission");
    } else {
      return res.redirect("/payment");
    }
  } catch (err) {
    console.error("Login error:", err.message);
    res.send("Login error");
  }
});

/* ===== LOGOUT ===== */
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
