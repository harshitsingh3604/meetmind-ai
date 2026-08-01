import express from "express";

import {
  generateMeetingSummary,
  generateMeetingActionItems,
  generateMeetingFollowupEmail,
  generateMeetingKeyPoints,
  getMeetingAIData,
} from "../controllers/aiController.js";

const router = express.Router();

/**
 * AI Routes
 */


router.post("/summary", generateMeetingSummary);

router.post("/key-points", generateMeetingKeyPoints);

router.post("/action-items", generateMeetingActionItems);

router.post("/followup", generateMeetingFollowupEmail);

router.get("/:meetingId", getMeetingAIData);

export default router;