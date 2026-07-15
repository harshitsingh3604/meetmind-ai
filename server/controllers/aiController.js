import {
  generateSummary,
  generateKeyPoints,
  generateActionItems,
  generateFollowupEmail,
} from "../services/geminiService.js";

/**
 * Generate Meeting Summary
 * POST /api/ai/summary
 */
export const generateMeetingSummary = async (req, res) => {
  try {
    const { meetingNotes } = req.body;

    // Validate Input
    if (!meetingNotes || !meetingNotes.trim()) {
      return res.status(400).json({
        success: false,
        message: "Meeting notes are required.",
      });
    }

    // Generate Summary
    const summary = await generateSummary(meetingNotes);

    // Success Response
    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Summary Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
    });
  }
};

/**
 * Generate Action Items
 * POST /api/ai/action-items
 */
export const generateMeetingActionItems = async (req, res) => {
  try {
    const { meetingNotes } = req.body;

    // Validate Input
    if (!meetingNotes || !meetingNotes.trim()) {
      return res.status(400).json({
        success: false,
        message: "Meeting notes are required.",
      });
    }

    // Generate Action Items
    const actionItems = await generateActionItems(meetingNotes);

    // Success Response
    return res.status(200).json({
      success: true,
      actionItems,
    });
  } catch (error) {
    console.error("Action Items Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
    });
  }
};

/**
 * Generate Follow-up Email
 * POST /api/ai/followup
 */
export const generateMeetingFollowupEmail = async (req, res) => {
  try {
    const { meetingNotes } = req.body;

    // Validate Input
    if (!meetingNotes || !meetingNotes.trim()) {
      return res.status(400).json({
        success: false,
        message: "Meeting notes are required.",
      });
    }

    // Generate Follow-up Email
    const followupEmail = await generateFollowupEmail(meetingNotes);

    // Success Response
    return res.status(200).json({
      success: true,
      followupEmail,
    });
  } catch (error) {
    console.error("Follow-up Email Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate AI response.",
    });
  }
};
