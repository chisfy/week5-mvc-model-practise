import { pool } from "../db/connection.js";

export async function getOwners() {
  // Query the database and return all owners

  // Define the SQL query to get all owners from the 'owners' table
  const querySQLText = "SELECT * FROM owners";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText);

  // The rows property of the result object contains the retrieved records
  return result.rows;

}

export async function getOwnerByID(id) {
  // Query the database and find an owner by theri id in the path url

  // Define the SQL query to get a specific owner from the 'owners' table (paramertized query)
  const querySQLText = "SELECT * FROM owners WHERE owner_id = $1";

  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(querySQLText, [id]);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;

}

export async function getOwnerssAlphabetical() {
  // Query the database and return all owners in alphabetical order

  // Define the SQL query to get all owners from the 'owners' table with a order by clause
  const querySQLText = "SELECT * FROM owners ORDER BY name ASC";

  // Use the pool object to send the query to the database
  const result = await pool.query(querySQLText);

  // The rows property of the result object contains the retrieved records
  return result.rows;

}

export async function getOwnerssByName(name) {
  // Query the database and get an owner by their name

  // Define the SQL query to get the owner by name (paramertized query)
  const querySQLText = "SELECT * FROM owners WHERE name = $1";

  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(querySQLText, [name]);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows;

}

export async function deleteOwnerByID(id) {
  // Query the database and delete owner by ID

  // Define the SQL query to delete owner by ID from the 'owners' table (paramertized query)
  const querySQLText = "DELETE FROM owners WHERE owner_id = $1 RETURNING *";

  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(querySQLText, [id]);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;

}

export async function updateOwnerInformation(id, newInformation) {
  // Query the database and edit the the owner by their id in the url

  // Define the SQL query to update owner by ID from the 'owners' table (paramertized query
  const queryText = `UPDATE owners 
  SET name = $1, address = $2, phone_number = $3 WHERE owner_id = $4 RETURNING *`;

  // parameterized large query by putting it in a array storing that in a variable
  const values = [newInformation.name, newInformation.address, newInformation.phone_number, id];
    
  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(queryText, values);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;

}

export async function addNewOwner(newOwner) {
  // Query the database to insert an owner into the owners table

  // Define the SQL query to insert a row into owners by ID from the 'owners' table (paramertized query)
  const queryText =` INSERT INTO owners
  (name, address, phone_number)
  VALUES ($1,$2,$3,$4,$5) RETURNING *`;

  // parameterized large query by putting it in a array storing that in a variable
  const values = [newOwner.name, newOwner.address, newOwner.phone_number];
  console.log(`values=${values}`); // testing the values 

  // Use the pool object to send the query to the database (paramertized query)
  const result = await pool.query(queryText, values);

  // The rows property of the result object contains the retrieved record or null if not found
  return result.rows[0] || null;

}