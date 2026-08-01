import {
  generateSummary,
  generateKeyPoints,
  generateActionItems,
  generateFollowupEmail,
} from "../services/geminiService.js";

import { saveSummary, getSummaryByMeeting } from "../models/AISummary.js";

import { saveActionItems, getActionItems } from "../models/ActionItem.js";

/**
 * Generate Meeting Summary
 * POST /api/ai/summary
 */
export const generateMeetingSummary = async (req, res) => {
  try {
    const { meetingId, meetingNotes } = req.body;

    if (!meetingId || !meetingNotes?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Meeting ID and notes are required.",
      });
    }

    // Generate summary using Gemini
    const summary = await generateSummary(meetingNotes);

    // Save generated summary to PostgreSQL
    await saveSummary({
      meetingId,
      summary,
    });

    // Return response
    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Generate Action Items
 * POST /api/ai/action-items
 */
export const generateMeetingActionItems = async (req, res) => {
  try {
    const { meetingId, meetingNotes } = req.body;

    // Validate Input
    if (!meetingId || !meetingNotes || !meetingNotes.trim()) {
      return res.status(400).json({
        success: false,
        message: "Meeting ID and notes are required.",
      });
    }

    const existingItems = await getActionItems(meetingId);

    if (existingItems.length) {
      return res.json({
        success: true,
        actionItems: existingItems,
      });
    }

    const actionItems = await generateActionItems(meetingNotes);

    await saveActionItems(meetingId, actionItems);

    return res.json({
      success: true,
      actionItems,
    });

    // Success Response
    return res.status(200).json({
      success: true,
      actionItems,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Generate Follow-up Email
 * POST /api/ai/followup
 */
export const generateMeetingFollowupEmail = async (req, res) => {
  try {
    const { meetingId, meetingNotes } = req.body;

    // Validate Input
    if (!meetingId || !meetingNotes || !meetingNotes.trim()) {
      return res.status(400).json({
        success: false,
        message: "Meeting ID and notes are required.",
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
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Generate Key Points
 * POST /api/ai/key-points
 */
export const generateMeetingKeyPoints = async (req, res) => {
  try {
    const { meetingId, meetingNotes } = req.body;

    // Validate Input
    if (!meetingId || !meetingNotes || !meetingNotes.trim()) {
      return res.status(400).json({
        success: false,
        message: "Meeting ID and notes are required.",
      });
    }

    // Generate Key Points
    const keyPoints = await generateKeyPoints(meetingNotes);

    // Success Response
    return res.status(200).json({
      success: true,
      keyPoints,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAIData = async (req, res) => {
  try {
    // Read meetingId from URL
    const { meetingId } = req.params;

    if (!meetingId) {
      return res.status(400).json({
        success: false,
        message: "Meeting ID is required.",
      });
    }

    // Get AI summary from database
    const summaryData = await getSummaryByMeeting(meetingId);

    // Get action items from database
    const actionItems = await getActionItems(meetingId);

    // Return combined response
    return res.status(200).json({
      success: true,
      data: {
        summary: summaryData?.summary || null,
        keyPoints: summaryData?.key_points || [],
        followupEmail: summaryData?.follow_up_email || "",
        actionItems,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
