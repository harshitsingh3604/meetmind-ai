import pool from "../config/db.js";

export const getUserProfile = async (userId) => {
  const result = await pool.query(
    `
    SELECT id, name, email
    FROM users
    WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0];
};

export const updateUserProfile = async (userId, name, email) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      name = $1,
      email = $2
    WHERE id = $3
    RETURNING id, name, email
    `,
    [name, email, userId]
  );

  return result.rows[0];
};

export const updateUserPassword = async (userId, hashedPassword) => {
  await pool.query(
    `
    UPDATE users
    SET password = $1
    WHERE id = $2
    `,
    [hashedPassword, userId]
  );
};