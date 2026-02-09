const express = require("express");
const router = express.Router();
const Admission = require("../models/admission");
const isAdminLoggedIn = require("../middleware/isAdminLoggedIn");
const sendEmail = require("../utils/sendEmail");
const sendWhatsApp = require("../utils/whatsapp");

// Show all admissions for admin
router.get("/admissions", isAdminLoggedIn, async (req, res) => {
  try {
    const admissions = await Admission.find().populate("studentId");
    res.render("admin/admissions", { admissions });
  } catch (err) {
    console.error(err);
    res.send("Failed to fetch admissions");
  }
});

// Approve admission
router.post("/admissions/:id/approve", isAdminLoggedIn, async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id).populate("studentId");
    if (!admission) return res.send("Admission not found");

    admission.status = "approved";
    await admission.save();

    // Notify student
    await sendEmail(admission.personalData.email, "Admission Approved", `
      <p>Hi ${admission.personalData.fullName},</p>
      <p>Your admission has been <strong>approved</strong>.</p>
    `);

    await sendWhatsApp(admission.personalData.phone, `Hi ${admission.personalData.fullName}, your admission has been approved.`);

    res.redirect("/admin/admissions");
  } catch (err) {
    console.error(err);
    res.send("Error approving admission");
  }
});

// Reject admission
router.post("/admissions/:id/reject", isAdminLoggedIn, async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id).populate("studentId");
    if (!admission) return res.send("Admission not found");

    admission.status = "rejected";
    await admission.save();

    // Notify student
    await sendEmail(admission.personalData.email, "Admission Rejected", `
      <p>Hi ${admission.personalData.fullName},</p>
      <p>We regret to inform you that your admission has been <strong>rejected</strong>.</p>
    `);

    await sendWhatsApp(admission.personalData.phone, `Hi ${admission.personalData.fullName}, your admission has been rejected.`);

    res.redirect("/admin/admissions");
  } catch (err) {
    console.error(err);
    res.send("Error rejecting admission");
  }
});

module.exports = router;
