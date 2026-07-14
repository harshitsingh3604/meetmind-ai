import express from "express";

import {
  createMeetingHandler,
  getAllMeetingsHandler,
  getMeetingByIdHandler,
  updateMeetingHandler,
  deleteMeetingHandler,
} from "../controllers/meetingController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Create Meeting
 * GET All Meetings
 */
router
  .route("/")
  .post(protect, createMeetingHandler)
  .get(protect, getAllMeetingsHandler);

/**
 * Get, Update & Delete Meeting
 */
router
  .route("/:id")
  .get(protect, getMeetingByIdHandler)
  .put(protect, updateMeetingHandler)
  .delete(protect, deleteMeetingHandler);

export default router;