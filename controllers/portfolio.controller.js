import Portfolio from "../models/Portfolio.model.js";
import { createError } from "../utils/error.js";

// Create new portfolio item
export const createPortfolio = async (req, res, next) => {
  try {
    const {
      category,
      projectTitle,
      projectSubtitle,
      description,
      techStack,
      imgLink,
      linkToProject,
    } = req.body;

    const portfolio = await Portfolio.create({
      category,
      projectTitle,
      projectSubtitle,
      description,
      techStack,
      imgLink,
      linkToProject,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio item created successfully",
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// Get all portfolio items
export const getPortfolios = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find().sort("-createdAt");

    res.status(200).json({
      success: true,
      count: portfolios.length,
      portfolios,
    });
  } catch (error) {
    next(error);
  }
};

// Get single portfolio item
export const getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return next(createError(404, "Portfolio item not found"));
    }

    res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// Update portfolio item
export const updatePortfolio = async (req, res, next) => {
  try {
    const {
      category,
      projectTitle,
      projectSubtitle,
      description,
      techStack,
      imgLink,
      linkToProject,
    } = req.body;

    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      {
        category,
        projectTitle,
        projectSubtitle,
        description,
        techStack,
        imgLink,
        linkToProject,
      },
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return next(createError(404, "Portfolio item not found"));
    }

    res.status(200).json({
      success: true,
      message: "Portfolio item updated successfully",
      portfolio,
    });
  } catch (error) {
    next(error);
  }
};

// Delete portfolio item
export const deletePortfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);

    if (!portfolio) {
      return next(createError(404, "Portfolio item not found"));
    }

    res.status(200).json({
      success: true,
      message: "Portfolio item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
