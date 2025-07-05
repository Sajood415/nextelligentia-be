import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
    },
    department: {
      type: String,
      enum: ["sales", "support", "billing", "general"],
      required: [true, "Please select a department"],
    },
    message: {
      type: String,
      required: [true, "Please provide a message"],
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "resolved"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contact", contactSchema);
