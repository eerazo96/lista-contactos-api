const db = require('../config/db');

const getAllContacts = async () => {
  const [rows] = await db.query(
    'SELECT * FROM contacts ORDER BY fecha_creacion DESC'
  );
  return rows;
};

const getContactById = async (id) => {
  const [rows] = await db.query(
    'SELECT * FROM contacts WHERE id = ?',
    [id]
  );
  return rows[0];
};

const createContact = async ({ nombre, telefono, email, categoria }) => {
  const [result] = await db.query(
    'INSERT INTO contacts (nombre, telefono, email, categoria) VALUES (?, ?, ?, ?)',
    [nombre, telefono, email, categoria]
  );

  return result.insertId;
};

const updateContact = async (id, { nombre, telefono, email, categoria }) => {
  const [result] = await db.query(
    'UPDATE contacts SET nombre=?, telefono=?, email=?, categoria=? WHERE id=?',
    [nombre, telefono, email, categoria, id]
  );

  return result.affectedRows;
};

const deleteContact = async (id) => {
  const [result] = await db.query(
    'DELETE FROM contacts WHERE id=?',
    [id]
  );

  return result.affectedRows;
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};
