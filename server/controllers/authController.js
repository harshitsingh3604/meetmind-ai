import bcrypt from "bcrypt";

import {
  createUser,
  getUserByEmail,
} from "../models/userModel.js";

import validateRegisterInput from "../validators/authValidator.js";
import generateToken from "../utils/generateToken.js";

/**
 * Register User
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate Input
    const { isValid, errors } = validateRegisterInput({
      name,
      email,
      password,
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    // Check Existing User
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered.",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken(user.id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

/**
 * Login User
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate Required Fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find User
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare Password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT
    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};