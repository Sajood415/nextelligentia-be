import Contact from "../models/Contact.model.js";
import { createError } from "../utils/error.js";

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, department, message } = req.body;

    if (!name || !email || !department || !message) {
      return next(createError(400, "All fields are required"));
    }

    const contact = await Contact.create({
      name,
      email,
      department,
      message,
    });

    res.status(201).json({
      success: true,
      contact,
    });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return next(createError(400, "Status is required"));
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return next(createError(404, "Contact not found"));
    }

    if (!["pending", "in-progress", "resolved"].includes(status)) {
      return next(createError(400, "Invalid status value"));
    }

    contact.status = status;
    await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      contact,
    });
  } catch (error) {
    next(error);
  }
};
