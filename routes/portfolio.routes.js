import express from "express";
import {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolio.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getPortfolios);
router.get("/:id", getPortfolio);

// Protected routes - only for admin
router.use(protect);
router.use(restrictTo("admin"));

router.post("/", createPortfolio);
router.put("/:id", updatePortfolio);
router.delete("/:id", deletePortfolio);

export default router;
