const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const Admission = require("../models/admission");
const isLoggedIn = require("../middleware/isLoggedIn");
const sendEmail = require("../utils/sendEmail");
const sendWhatsApp = require("../utils/whatsapp");

/* ================= MULTER CONFIG ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// multer fields (FIXED)
const uploadFields = upload.fields([
  { name: "candidatePassport", maxCount: 1 },
]);

/* ================= ROUTES ================= */

// Show Admission Form
router.get("/", isLoggedIn, (req, res) => {
  res.render("admission");
});


// Handle Admission Submission
router.post("/preview", isLoggedIn, uploadFields, async (req, res) => {
  try {
    const {
      receiptNo, dd, mm, yy,
      fullName, contactAddress, sex, dob, maritalStatus, maidenName,
      phone, email, stateOfOrigin, nationality, localGovernment,
      extraCurricular, medicalHistory,
      fatherName, fatherContactAddress, fatherPhone, fatherEmail,
      motherName, motherMaidenName, motherContactAddress, motherPhone, motherEmail,
      course, programTransfer, programMode,
      examTaken, examName, examDate, examNo, subjects, grades, credentials,
      introSource, declaration
    } = req.body;

    const candidatePassport =
      req.files?.candidatePassport?.[0]?.filename || null;

    const exams = [];

    if (Array.isArray(examName)) {
      examName.forEach((e, i) => {
        exams.push({
          examName: e,
          examDate: examDate?.[i] || "",
          examNo: examNo?.[i] || "",
          subjects: subjects?.[i] || "",
          grades: grades?.[i] || "",
          credentials: credentials?.[i] || ""
        });
      });
    }

    await Admission.create({
      studentId: req.session.studentId,
      receiptNo, dd, mm, yy,
      candidatePassport,
      personalData: {
        fullName, contactAddress, sex, dob, maritalStatus, maidenName,
        phone, email, stateOfOrigin, nationality, localGovernment,
        extraCurricular, medicalHistory
      },
      parentsInfo: {
        father: { name: fatherName, contactAddress: fatherContactAddress, phone: fatherPhone, email: fatherEmail },
        mother: { name: motherName, maidenName: motherMaidenName, contactAddress: motherContactAddress, phone: motherPhone, email: motherEmail }
      },
      choiceOfCourse: { course, programTransfer, programMode },
      education: {
        examTaken: Array.isArray(examTaken) ? examTaken : [examTaken],
        exams
      },
      introSource: Array.isArray(introSource) ? introSource : [introSource],
      declaration
    });

    res.redirect("/payment");

  } catch (err) {
    console.error("Admission Submission Error:", err);
    res.status(500).send("Admission submission failed.");
  }
});

module.exports = router;
