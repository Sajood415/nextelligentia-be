import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide your last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
    countryCode: {
      type: String,
      required: [true, "Please provide country code"],
      default: "+92",
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    budget: {
      type: String,
      required: [true, "Please provide your budget"],
    },
    company: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      required: [true, "Please provide your region"],
    },
    services: {
      type: [String],
      required: [true, "Please select at least one service"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one service must be selected",
      },
    },
    projectDetails: {
      type: String,
      required: [true, "Please provide project details"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Lead", leadSchema);
