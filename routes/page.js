const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Legend College of Nursing Science - Home" // pass a value for title
  });
});

router.get("/overview", (req, res) => {
  res.render("overview", { title: "Legend College of Nursing Science | College Overview" });
});

router.get("/why-study", (req, res) => {
  res.render("why-study", { title: "Legend College of Nursing Science | College Why-Study" });
});

router.get("/proprietormsg", (req, res) => {
  res.render("proprietormsg", { title: "Legend College of Nursing Science | College Proprietormsg" });
});

router.get("/mission", (req, res) => {
  res.render("mission", { title: "Legend College of Nursing Science | College Mission" });
});

router.get("/history", (req, res) => {
  res.render("history", { title: "Legend College of Nursing Science | College History" });
});

router.get("/admissionpage", (req, res) => {
  res.render("admissionpage", { title: "Legend College of Nursing Science | College Admissionpage" });
});

router.get("/admissionprocedure", (req, res) => {
  res.render("admissionprocedure", { title: "Legend College of Nursing Science | College Admissionprocedure" });
});

router.get("/prospectives", (req, res) => {
  res.render("prospectives", { title: "Legend College of Nursing Science | College Prospectives" });
});

router.get("/courses", (req, res) => {
  res.render("courses", { title: "Legend College of Nursing Science | College Courses" });
});

router.get("/elibrary", (req, res) => {
  res.render("elibrary", { title: "Legend College of Nursing Science | College Elibrary" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Legend College of Nursing Science | College Contact" });
});

router.get("/elibrary", (req, res) => {
  res.render("elibrary", { title: "Legend College of Nursing Science | College Elibrary" });
});

router.get("/elibrary", (req, res) => {
  res.render("elibrary", { title: "Legend College of Nursing Science | College Elibrary" });
});

router.get("/portal", (req, res) => {
  res.render("portal", { title: "Legend College of Nursing Science | Admission Portal" });
});

// res.render("admission", { title: "Admission Form | Legend College of Nursing Science" });
// res.render("payment", { title: "Payment | Legend College of Nursing Science" });


module.exports = router;
