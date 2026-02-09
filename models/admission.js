const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  // ===== RECEIPT & PASSPORT =====
  receiptNo: String,
  dd: String,
  mm: String,
  yy: String,
  candidatePassport: String,

  // ===== 1. PERSONAL DATA =====
  personalData: {
    fullName: String,
    contactAddress: String,
    sex: String,
    dob: Date,
    maritalStatus: String,
    maidenName: String,
    phone: String,
    email: String,
    stateOfOrigin: String,
    nationality: String,
    localGovernment: String,
    extraCurricular: String,
    medicalHistory: String
  },

  // ===== 2. PARENTS INFORMATION =====
  parentsInfo: {
    father: {
      name: String,
      contactAddress: String,
      phone: String,
      email: String
    },
    mother: {
      name: String,
      maidenName: String,
      contactAddress: String,
      phone: String,
      email: String
    }
  },

  // ===== 3. CHOICE OF COURSE =====
  choiceOfCourse: {
    course: String, // Nursing Science
    programTransfer: String, // Yes / No
    programMode: String // Regular / Evening
  },

  // ===== 4. EDUCATION =====
  education: {
    examTaken: [String], // WAEC, NECO, OTHER
    exams: [
      {
        examName: String,
        examDate: String,
        examNo: String,
        subjects: String,
        grades: String,
        credentials: String // X or AR
      }
    ]
  },

  // ===== 5. INTRODUCTION SOURCE =====
  introSource: [String], // Advertisement, Student, Parent, Staff

  // ===== 6. DECLARATION =====
  declaration: String,

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});


module.exports = mongoose.model("Admission", admissionSchema);
