import { pool } from "../db/connection.js";

export async function getOwners() {
  // Query the database and return all books

  // Define the SQL query to get all owners from the 'owners' table
  const querySQLText = "SELECT * FROM owners";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getOwnerByID(id) {
  // Query the database and return all books

  // Define the SQL query to get all dogs from the 'doga' table
  const querySQLText = "SELECT * FROM owners WHERE owner_id = $1";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText, [id]);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;
}
