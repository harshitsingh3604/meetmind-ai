import { GoogleGenAI } from "@google/genai";

import {
  buildSummaryPrompt,
  buildKeyPointsPrompt,
  buildActionItemsPrompt,
  buildFollowUpEmailPrompt,
} from "./promptTemplates.js";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("Gemini API key is not configured.");
}

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


/**
 * Clean AI Response
 */
const cleanResponse = (text) => {
  if (!text) return "";

  return text
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/^#+\s?/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};


/**
 * Generate Meeting Summary
 */
export const generateSummary = async (meetingNotes) => {
  if (!meetingNotes || !meetingNotes.trim()) {
    throw new Error("Meeting notes are required.");
  }

  try {
    const prompt = buildSummaryPrompt(meetingNotes);

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    if (!response || !response.text) {
      throw new Error("Invalid response received from Gemini.");
    }

    return cleanResponse(response.text);
  } catch (error) {
    console.error("Summary Generation Error:", error);

    if (error.message?.includes("API key")) {
      throw new Error("Gemini API key is invalid.");
    }

    throw new Error("Failed to generate meeting summary.");
  }
};

/**
 * Generate Key Points
 */
export const generateKeyPoints = async (meetingNotes) => {
  if (!meetingNotes || !meetingNotes.trim()) {
    throw new Error("Meeting notes are required.");
  }
  try {
    const prompt = buildKeyPointsPrompt(meetingNotes);

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    if (!response || !response.text) {
      throw new Error("Invalid response received from Gemini.");
    }

    return cleanResponse(response.text);
  } catch (error) {
    console.error("Key Points Generation Error:", error);

    if (error.message?.includes("API key")) {
      throw new Error("Gemini API key is invalid.");
    }

    throw new Error("Failed to generate key points.");
  }
};

/**
 * Generate Action Items
 */
export const generateActionItems = async (meetingNotes) => {
  if (!meetingNotes || !meetingNotes.trim()) {
    throw new Error("Meeting notes are required.");
  }
  try {
    const prompt = buildActionItemsPrompt(meetingNotes);

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    if (!response || !response.text) {
      throw new Error("Invalid response received from Gemini.");
    }
    return cleanResponse(response.text);
  } catch (error) {
    console.error("Action Items Generation Error:", error);

    if (error.message?.includes("API key")) {
      throw new Error("Gemini API key is invalid.");
    }

    throw new Error("Failed to generate action items.");
  }
};

/**
 * Generate Follow-up Email
 */
export const generateFollowupEmail = async (meetingNotes) => {
  if (!meetingNotes || !meetingNotes.trim()) {
    throw new Error("Meeting notes are required.");
  }
  try {
    const prompt = buildFollowUpEmailPrompt(meetingNotes);

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    if (!response || !response.text) {
      throw new Error("Invalid response received from Gemini.");
    }

    return cleanResponse(response.text);
  } catch (error) {
    console.error("Follow-up Email Generation Error:", error);

    if (error.message?.includes("API key")) {
      throw new Error("Gemini API key is invalid.");
    }

    throw new Error("Failed to generate follow-up email.");
  }
};
