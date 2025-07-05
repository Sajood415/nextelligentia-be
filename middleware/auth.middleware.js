import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
import User from "../models/User.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(createError(401, "Not authorized"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(createError(401, "User not found"));
    }

    req.user = user;
    next();
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    next(createError(401, "Not authorized"));
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(createError(403, "Not authorized to access this route"));
    }
    next();
  };
};
