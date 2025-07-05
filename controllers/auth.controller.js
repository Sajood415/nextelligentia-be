import User from "../models/User.model.js";
import { createError } from "../utils/error.js";
import { generateToken } from "../utils/token.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, "Email already exists"));
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return next(createError(400, "Invalid credentials"));
    }

    const token = generateToken(user._id);
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
