import express from "express";
import {
  adminLogin,
  getDashboardStats,
  verify2FA,
} from "../controllers/admin.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/login", adminLogin);
router.post("/verify-2fa", verify2FA);

// Protected admin routes
router.use(protect);
router.use(restrictTo("admin"));
router.get("/dashboard/stats", getDashboardStats);

export default router;
