import bcrypt from "bcrypt";

import {
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
} from "../models/profileModel.js";

import { getUserByEmail } from "../models/userModel.js";

export const fetchProfile = async (req, res) => {
  try {

    const user = await getUserProfile(req.user.id);

    return res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to load profile.",
    });

  }
};

export const updateProfile = async (req, res) => {
  try {

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required.",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (
      existingUser &&
      existingUser.id !== req.user.id
    ) {
      return res.status(409).json({
        success: false,
        message: "Email is already in use.",
      });
    }

    const user = await updateUserProfile(
      req.user.id,
      name,
      email
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: user,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });

  }
};

export const changePassword = async (req, res) => {
  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required.",
      });
    }

    const user = await getUserByEmail(req.user.email);

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    await updateUserPassword(
      req.user.id,
      hashedPassword
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update password.",
    });

  }
};

