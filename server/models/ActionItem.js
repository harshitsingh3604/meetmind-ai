import pool from "../config/db.js";

/**
 * Save multiple action items for a meeting
 */
export async function saveActionItems(meetingId, actionItems) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const savedItems = [];

    for (const item of actionItems) {
      const query = `
        INSERT INTO action_items
        (
          meeting_id,
          action_item
        )
        VALUES ($1, $2)
        RETURNING *;
      `;

      const values = [
        meetingId,
        item,
      ];

      const { rows } = await client.query(query, values);

      savedItems.push(rows[0]);
    }

    await client.query("COMMIT");

    return savedItems;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Get all action items for a meeting
 */
export async function getActionItems(meetingId) {
  const query = `
    SELECT
      id,
      action_item,
      status
    FROM action_items
    WHERE meeting_id = $1
    ORDER BY id ASC;
  `;

  const { rows } = await pool.query(query, [meetingId]);

  return rows;
}