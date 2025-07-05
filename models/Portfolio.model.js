import mongoose from "mongoose";

const portfolioSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: [
        "enterprise",
        "ecommerce",
        "web",
        "logo",
        "social",
        "marketing",
        "mobile",
        "blockchain",
        "health",
        "crm",
      ],
    },
    projectTitle: {
      type: String,
      required: [true, "Please provide a project title"],
      trim: true,
    },
    projectSubtitle: {
      type: String,
      required: [true, "Please provide a project subtitle"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a project description"],
    },
    techStack: {
      type: [String],
      required: [true, "Please provide the tech stack"],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one technology must be specified",
      },
    },
    imgLink: {
      type: String,
      required: [true, "Please provide an image link"],
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: "Please provide a valid image URL",
      },
    },
    linkToProject: {
      type: String,
      required: [true, "Please provide a project link"],
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: "Please provide a valid URL",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Portfolio", portfolioSchema);
