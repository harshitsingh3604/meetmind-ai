import {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
} from "../models/meetingModel.js";

import validateMeetingInput from "../validators/meetingValidator.js";

/* Create Meeting */
export const createMeetingHandler = async (req, res) => {
  try {
    const { title, meetingType, participants, meetingNotes, meetingDate } =
      req.body;

    const { isValid, errors } = validateMeetingInput({
      title,
      meetingType,
      meetingNotes,
      meetingDate,
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const meeting = await createMeeting({
      userId: req.user.id,
      title,
      meetingType,
      participants,
      meetingNotes,
      meetingDate,
    });

    return res.status(201).json({
      success: true,
      message: "Meeting created successfully.",
      data: meeting,
    });
  } catch (error) {
    console.error("Create Meeting Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

/* Get All Meetings */
export const getAllMeetingsHandler = async (req, res) => {
  try {
    const meetings = await getAllMeetings(req.user.id);

    return res.status(200).json({
      success: true,
      data: meetings,
    });
  } catch (error) {
    console.error("Get Meetings Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

/* Get Single Meeting */
export const getMeetingByIdHandler = async (req, res) => {
  try {
    const meeting = await getMeetingById(req.params.id, req.user.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: meeting,
    });
  } catch (error) {
    console.error("Get Meeting Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

/* Update Meeting */
export const updateMeetingHandler = async (req, res) => {
  try {
    const { title, meetingType, participants, meetingNotes, meetingDate } =
      req.body;

    const { isValid, errors } = validateMeetingInput({
      title,
      meetingType,
      meetingNotes,
      meetingDate,
    });

    if (!isValid) {
      return res.status(400).json({
        success: false,
        errors,
      });
    }

    const meeting = await updateMeeting({
      meetingId: req.params.id,
      userId: req.user.id,
      title,
      meetingType,
      participants,
      meetingNotes,
      meetingDate,
    });

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meeting updated successfully.",
      data: meeting,
    });
  } catch (error) {
    console.error("Update Meeting Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};

/**
 * Delete Meeting
 */
export const deleteMeetingHandler = async (req, res) => {
  try {
    const meeting = await deleteMeeting(req.params.id, req.user.id);

    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Meeting deleted successfully.",
      data: null,
    });
  } catch (error) {
    console.error("Delete Meeting Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};
