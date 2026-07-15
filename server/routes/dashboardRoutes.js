import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getDashboardStatistics,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  getDashboardStatistics
);

export default router;