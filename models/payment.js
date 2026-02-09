const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  paymentReceiptFile: { type: String, required: true },
  paidAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Payment", paymentSchema);
