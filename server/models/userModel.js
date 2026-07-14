import pool from "../config/db.js";

/* Create a new user */
export const createUser = async ({ name, email, password }) => {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, created_at;
  `;

  const values = [name, email, password];

  const { rows } = await pool.query(query, values);

  return rows[0];
};

/* Get user by email */
export const getUserByEmail = async (email) => {
  const query = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;

  const { rows } = await pool.query(query, [email]);

  return rows[0];
};

/*  Get user by ID */
export const getUserById = async (id) => {
  const query = `
    SELECT id, name, email, created_at
    FROM users
    WHERE id = $1;
  `;

  const { rows } = await pool.query(query, [id]);

  return rows[0];
};