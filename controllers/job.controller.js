import Job from "../models/Job.model.js";
import { createError } from "../utils/error.js";

// Create a new job posting (Admin only)
export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};

// Get all jobs (Public)
export const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ status: "active" }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// Get all jobs (Admin)
export const getAllJobsAdmin = async (req, res, next) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .populate("postedBy", "name email");

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

// Update job (Admin only)
export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      return next(createError(404, "Job not found"));
    }

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};

// Delete job (Admin only)
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return next(createError(404, "Job not found"));
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Update job status (Admin only)
export const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["active", "expired", "filled"].includes(status)) {
      return next(createError(400, "Invalid status"));
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!job) {
      return next(createError(404, "Job not found"));
    }

    res.status(200).json({
      success: true,
      message: "Job status updated successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};
