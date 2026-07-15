import pool from "../config/db.js";

export const getDashboardStats = async (userId) => {

  const totalMeetingsQuery = `
    SELECT COUNT(*) AS total
    FROM meetings
    WHERE user_id = $1
  `;

  const meetingsThisMonthQuery = `
    SELECT COUNT(*) AS total
    FROM meetings
    WHERE user_id = $1
      AND DATE_TRUNC('month', meetingDate) =
          DATE_TRUNC('month', CURRENT_DATE)
  `;

  const recentMeetingsQuery = `
    SELECT id,
           title,
           meeting_type,
           meetingDate
    FROM meetings
    WHERE user_id = $1
    ORDER BY meeting_date DESC
    LIMIT 5
  `;

  const [
    totalMeetings,
    meetingsThisMonth,
    recentMeetings,
  ] = await Promise.all([
    pool.query(totalMeetingsQuery, [userId]),
    pool.query(meetingsThisMonthQuery, [userId]),
    pool.query(recentMeetingsQuery, [userId]),
  ]);

  return {
    totalMeetings: Number(totalMeetings.rows[0].total),
    meetingsThisMonth: Number(meetingsThisMonth.rows[0].total),

    // Placeholder until AI/task persistence exists
    aiSummaries: 0,
    pendingTasks: 0,

    recentMeetings: recentMeetings.rows,
  };
};