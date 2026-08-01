import pool from "../config/db.js";

/**
 * Save AI summary for a meeting
 */
export async function saveSummary({
  meetingId,
  userId,
  summary,
  keyPoints,
  actionItems,
  followUpEmail,
}) {
  const query = `
    INSERT INTO ai_summaries
    (
      meeting_id,
      user_id,
      summary,
      key_points,
      action_items,
      follow_up_email
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    meetingId,
    userId,
    summary,
    keyPoints,
    actionItems,
    followUpEmail,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}

/**
 * Get AI summary by meeting ID
 */

export async function getSummaryByMeeting(meetingId) {
  const query = `
    SELECT
      summary,
      key_points,
      follow_up_email
    FROM ai_summaries
    WHERE meeting_id = $1
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [meetingId]);

  return rows[0];
}

/**
 * Update AI summary
 */
export async function updateSummary(
  meetingId,
  {
    summary,
    keyPoints,
    actionItems,
    followUpEmail,
  }
) {
  const query = `
    UPDATE ai_summaries
    SET
      summary = $1,
      key_points = $2,
      action_items = $3,
      follow_up_email = $4,
      updated_at = NOW()
    WHERE meeting_id = $5
    RETURNING *;
  `;

  const values = [
    summary,
    keyPoints,
    actionItems,
    followUpEmail,
    meetingId,
  ];

  const { rows } = await pool.query(query, values);

  return rows[0];
}