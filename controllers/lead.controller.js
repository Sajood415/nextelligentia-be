import Lead from "../models/Lead.model.js";
import { createError } from "../utils/error.js";
import {
  sendLeadNotification,
  sendWelcomeEmail,
} from "../utils/emailService.js";
import logger from "../config/logger.js";

export const createLead = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      countryCode,
      phone,
      budget,
      company,
      region,
      services,
      projectDetails,
    } = req.body;

    const lead = await Lead.create({
      firstName,
      lastName,
      email,
      countryCode,
      phone,
      budget,
      company,
      region,
      services,
      projectDetails,
    });

    // Send email notifications (don't block response if email fails)
    const emailPromises = [sendLeadNotification(lead), sendWelcomeEmail(lead)];

    // Send emails asynchronously without waiting for them to complete
    Promise.all(emailPromises)
      .then((results) => {
        logger.info("Email notifications processed:", results);
      })
      .catch((error) => {
        logger.error("Error processing email notifications:", error);
      });

    res.status(201).json({
      success: true,
      message: "Thank you for your interest! Our team will contact you soon.",
      lead,
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      leads,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["new", "contacted", "qualified", "lost"];
    if (!validStatuses.includes(status)) {
      return next(createError(400, "Invalid status value"));
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return next(createError(404, "Lead not found"));
    }

    res.status(200).json({
      success: true,
      lead,
    });
  } catch (error) {
    next(error);
  }
};
