import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide job title"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Please provide department"],
      enum: [
        "engineering",
        "design",
        "marketing",
        "sales",
        "operations",
        "other",
      ],
    },
    location: {
      type: String,
      required: [true, "Please provide job location"],
      enum: ["remote", "onsite", "hybrid"],
    },
    type: {
      type: String,
      required: [true, "Please provide job type"],
      enum: ["full-time", "part-time", "contract", "internship"],
    },
    experience: {
      type: String,
      required: [true, "Please provide required experience"],
    },
    description: {
      type: String,
      required: [true, "Please provide job description"],
    },
    requirements: [
      {
        type: String,
        required: [true, "Please provide job requirements"],
      },
    ],
    status: {
      type: String,
      enum: ["active", "expired", "filled"],
      default: "active",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
