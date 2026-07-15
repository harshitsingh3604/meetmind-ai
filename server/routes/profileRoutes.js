import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  fetchProfile,
  updateProfile,
  changePassword,
} from "../controllers/profileController.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  fetchProfile
);

router.put(
  "/",
  authMiddleware,
  updateProfile
);

router.put(
  "/password",
  authMiddleware,
  changePassword
);

export default router;