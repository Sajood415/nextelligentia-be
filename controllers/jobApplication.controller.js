import JobApplication from "../models/JobApplication.model.js";
import Job from "../models/Job.model.js";
import { createError } from "../utils/error.js";

// Submit job application (Public)
export const submitApplication = async (req, res, next) => {
  try {
    const job = await Job.findById(req.body.job);

    if (!job) {
      return next(createError(404, "Job not found"));
    }

    if (job.status !== "active") {
      return next(createError(400, "This job posting is no longer active"));
    }

    const application = await JobApplication.create(req.body);

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

// Get all applications for a specific job (Admin only)
export const getJobApplications = async (req, res, next) => {
  try {
    const applications = await JobApplication.find({
      job: req.params.jobId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    next(error);
  }
};

// Update application status (Admin only)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (
      !["pending", "reviewed", "shortlisted", "rejected", "hired"].includes(
        status
      )
    ) {
      return next(createError(400, "Invalid status"));
    }

    const application = await JobApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!application) {
      return next(createError(404, "Application not found"));
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};
