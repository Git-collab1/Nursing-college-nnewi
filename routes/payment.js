const express = require("express");
const router = express.Router();
const Payment = require("../models/payment");
const isLoggedIn = require("../middleware/isLoggedIn");
const multer = require("multer");
const path = require("path");

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Show Payment Page
router.get("/", isLoggedIn, (req, res) => {
  // You can later fetch this dynamically from DB or env variables
  res.render("payment", {
    bank: "Opay Bank",
    accountName: "Legend College of Nursing Science",
    accountNumber: "1234567890",
    amount: "15,000"
  });
});

// Handle Payment Submission
router.post(
  "/",
  isLoggedIn,
  upload.single("paymentReceipt"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.send("Please upload your payment receipt");
      }

      // Save Payment
      await Payment.create({
        student: req.session.studentId,
        paymentReceiptFile: req.file.filename
      });

      // Render success page
      res.render("success");

    } catch (err) {
      console.log("Payment error:", err);
      res.send("Error completing admission");
    }
  }
);



module.exports = router;
