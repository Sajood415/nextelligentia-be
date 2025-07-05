import express from "express";
import {
  createLead,
  getLeads,
  updateLeadStatus,
} from "../controllers/lead.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createLead);
router.get("/", protect, restrictTo("admin"), getLeads);
router.patch("/:id/status", protect, restrictTo("admin"), updateLeadStatus);

export default router;
