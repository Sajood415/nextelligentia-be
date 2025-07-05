import express from "express";
import {
  submitContact,
  getContacts,
  updateContactStatus,
} from "../controllers/contact.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public route
router.post("/", submitContact);

// Protected routes
router.use(protect);
router.get("/", getContacts);
router.patch("/:id/status", restrictTo("admin"), updateContactStatus);

export default router;
