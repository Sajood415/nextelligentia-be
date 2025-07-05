import express from "express";
import {
  createJob,
  getAllJobs,
  getAllJobsAdmin,
  updateJob,
  deleteJob,
  updateJobStatus,
} from "../controllers/job.controller.js";
import {
  submitApplication,
  getJobApplications,
  updateApplicationStatus,
} from "../controllers/jobApplication.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllJobs);
router.post("/apply", submitApplication);

// Protected routes (Admin only)
router.use(protect);
router.use(restrictTo("admin"));

router.route("/admin").get(getAllJobsAdmin).post(createJob);

router.route("/admin/:id").put(updateJob).delete(deleteJob);

router.put("/admin/:id/status", updateJobStatus);

// Job applications routes
router.get("/applications/:jobId", getJobApplications);
router.put("/applications/:id/status", updateApplicationStatus);

export default router;
