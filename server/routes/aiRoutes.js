import express from "express";

import {
  generateMeetingSummary,
  generateMeetingActionItems,
  generateMeetingFollowupEmail,
} from "../controllers/aiController.js";

const router = express.Router();

/**
 * AI Routes
 */

// Generate Meeting Summary
router.post("/summary", generateMeetingSummary);

// Generate Action Items
router.post("/action-items", generateMeetingActionItems);

// Generate Follow-up Email
router.post("/followup", generateMeetingFollowupEmail);

export default router;