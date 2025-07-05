import mongoose from "mongoose";
import validator from "validator";

const jobApplicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    experience: {
      type: String,
      required: [true, "Please provide your experience"],
    },
    resume: {
      type: String, // Can store either base64 or URL
      required: [true, "Please provide your resume"],
    },
    isResumeBase64: {
      type: Boolean,
      default: false,
    },
    coverLetter: {
      type: String,
    },
    portfolio: {
      type: String,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return validator.isURL(v);
        },
        message: "Please provide a valid portfolio URL",
      },
    },
    status: {
      type: String,
      enum: ["pending", "reviewed", "shortlisted", "rejected", "hired"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("JobApplication", jobApplicationSchema);
