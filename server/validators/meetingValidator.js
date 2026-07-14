const validateMeetingInput = ({
  title,
  meetingType,
  meetingNotes,
  meetingDate,
}) => {
  const errors = {};

  // Title Validation
  if (!title || title.trim() === "") {
    errors.title = "Meeting title is required.";
  }

  // Meeting Type Validation
  if (!meetingType || meetingType.trim() === "") {
    errors.meetingType = "Meeting type is required.";
  }

  // Meeting Notes Validation
  if (!meetingNotes || meetingNotes.trim() === "") {
    errors.meetingNotes = "Meeting notes are required.";
  }

  // Meeting Date Validation
  if (!meetingDate) {
    errors.meetingDate = "Meeting date is required.";
  } else {
    const selectedDate = new Date(meetingDate);

    if (isNaN(selectedDate.getTime())) {
      errors.meetingDate = "Please provide a valid meeting date.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validateMeetingInput;