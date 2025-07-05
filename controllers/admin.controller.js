import User from "../models/User.model.js";
import { createError } from "../utils/error.js";
import { generateToken } from "../utils/token.js";
import Lead from "../models/Lead.model.js";
import Job from "../models/Job.model.js";
import JobApplication from "../models/JobApplication.model.js";
import Portfolio from "../models/Portfolio.model.js";
import Contact from "../models/Contact.model.js";
import nodemailer from "nodemailer";

// Simple in-memory OTP storage (replace with database in production)
const otpStore = {};

// Simple email function
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Login Verification Code",
    text: `Your verification code is: ${otp}`,
  });
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    const admin = await User.findOne({ email, role: "admin" }).select(
      "+password"
    );
    if (!admin) {
      console.log("Admin not found with email:", email);
      return next(createError(404, "Admin not found"));
    }

    console.log("Admin found, comparing password...");
    const isPasswordCorrect = await admin.comparePassword(password);
    console.log("Password comparison result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return next(createError(400, "Invalid credentials"));
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with 10 minute expiry
    otpStore[admin._id] = {
      otp,
      expiry: Date.now() + 10 * 60 * 1000,
    };

    // Send OTP email
    await sendOtpEmail(email, otp);

    res.status(200).json({
      success: true,
      message: "Verification code sent to your email",
      adminId: admin._id,
    });
  } catch (error) {
    console.error("Admin login error:", error);
    next(error);
  }
};

export const verify2FA = async (req, res, next) => {
  try {
    const { adminId, otp } = req.body;

    // Check if OTP exists and is valid
    if (!otpStore[adminId]) {
      return next(createError(400, "Verification code expired or invalid"));
    }

    if (otpStore[adminId].expiry < Date.now()) {
      delete otpStore[adminId];
      return next(createError(400, "Verification code expired"));
    }

    if (otpStore[adminId].otp !== otp) {
      return next(createError(400, "Invalid verification code"));
    }

    // OTP is valid, clear it
    delete otpStore[adminId];

    // Get admin details
    const admin = await User.findById(adminId);
    if (!admin) {
      return next(createError(404, "Admin not found"));
    }

    // Generate token
    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    // Get counts for all entities
    const [
      totalLeads,
      totalJobs,
      totalJobApplications,
      totalPortfolioItems,
      totalContacts,
      activeJobs,
      newLeads,
      pendingApplications,
    ] = await Promise.all([
      Lead.countDocuments(),
      Job.countDocuments(),
      JobApplication.countDocuments(),
      Portfolio.countDocuments(),
      Contact.countDocuments(),
      Job.countDocuments({ status: "active" }),
      Lead.countDocuments({ status: "new" }),
      JobApplication.countDocuments({ status: "pending" }),
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalLeads,
        totalJobs,
        totalJobApplications,
        totalPortfolioItems,
        totalContacts,
        activeJobs,
        newLeads,
        pendingApplications,
      },
    });
  } catch (error) {
    next(error);
  }
};
