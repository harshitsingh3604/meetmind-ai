import pool from "../config/db.js";

/*  Create a new meeting */
export const createMeeting = async ({
  userId,
  title,
  meetingType,
  participants,
  meetingNotes,
  meetingDate,
}) => {
  const query = `
    INSERT INTO meetings (
      user_id,
      title,
      meeting_type,
      participants,
      meeting_notes,
      meetingDate,
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    userId,
    title,
    meetingType,
    participants,
    meetingNotes,
    meetingDate,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

/*  Get all meetings for a user */
export const getAllMeetings = async (userId) => {
  const query = `
    SELECT *
    FROM meetings
    WHERE user_id = $1
    ORDER BY meeting_date  DESC, created_at DESC;
  `;

  const { rows } = await pool.query(query, [userId]);

  return rows;
};

/*  Get a meeting by ID */
export const getMeetingById = async (meetingId, userId) => {
  const query = `
    SELECT *
    FROM meetings
    WHERE id = $1
      AND user_id = $2;
  `;

  const { rows } = await pool.query(query, [
    meetingId,
    userId,
  ]);

  return rows[0];
};

/*  Update a meeting */
export const updateMeeting = async ({
  meetingId,
  userId,
  title,
  meetingType,
  participants,
  meetingNotes,
  meetingDate,
}) => {
  const query = `
    UPDATE meetings
    SET
      title = $1,
      meeting_type = $2,
      participants = $3,
      meeting_notes = $4,
      meeting_date = $5
    WHERE
      id = $6
      AND user_id = $7
    RETURNING *;
  `;

  const values = [
    title,
    meetingType,
    participants,
    meetingNotes,
    meetingDate,
    meetingId,
    userId,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

/*  Delete a meeting */
export const deleteMeeting = async (meetingId, userId) => {
  const query = `
    DELETE FROM meetings
    WHERE
      id = $1
      AND user_id = $2
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    meetingId,
    userId,
  ]);

  return rows[0];
};