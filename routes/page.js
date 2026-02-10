// routes/page.js
const express = require("express");
const router = express.Router();

// ----------------------
// GET Routes
// ----------------------
router.get("/", (req, res) => {
  res.render("index", { title: "Legend College of Nursing Science | Home", messages: {} });
});

router.get("/overview", (req, res) => {
  res.render("overview", { title: "Legend College of Nursing Science | Overview", messages: {} });
});

router.get("/why-study", (req, res) => {
  res.render("why-study", { title: "Legend College of Nursing Science | Why Study at LGHC", messages: {} });
});

router.get("/proprietormsg", (req, res) => {
  res.render("proprietormsg", { title: "Legend College of Nursing Science | Proprietor Message", messages: {} });
});

router.get("/mission", (req, res) => {
  res.render("mission", { title: "Legend College of Nursing Science | Mission & Vision", messages: {} });
});

router.get("/history", (req, res) => {
  res.render("history", { title: "Legend College of Nursing Science | History", messages: {} });
});

router.get("/admissionprocedure", (req, res) => {
  res.render("admissionprocedure", { title: "Legend College of Nursing Science | Admission Procedure", messages: {} });
});

router.get("/prospectives", (req, res) => {
  res.render("prospectives", { title: "Legend College of Nursing Science | Career Prospects", messages: {} });
});

router.get("/courses", (req, res) => {
  res.render("courses", { title: "Legend College of Nursing Science | Courses Offered", messages: {} });
});

router.get("/elibrary", (req, res) => {
  res.render("elibrary", { title: "Legend College of Nursing Science | E-Library", messages: {} });
});

router.get("/portal", (req, res) => {
  res.render("portal", { title: "Legend College of Nursing Science | Student Portal", messages: {} });
});

// ----------------------
// Contact Page
// ----------------------
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us", messages: {} });
});

// POST Contact Form
router.post("/contact", (req, res) => {
  const { name, email, phone, hearAbout, message } = req.body;

  // Basic validation
  if (!name || !email || !phone || !hearAbout || !message) {
    return res.render("contact", {
      title: "Contact Us",
      messages: { error: "All fields are required!", success: null }
    });
  }

  // Here you can save the form to DB or send email
  console.log("Contact form submitted:", req.body);

  return res.render("contact", {
    title: "Contact Us",
    messages: { error: null, success: "Your message has been sent successfully!" }
  });
});

// Export router
module.exports = router;
