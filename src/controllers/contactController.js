const contactModel = require('../models/contactModel');

const validarContacto = ({ nombre, telefono, email, categoria }) => {
  if (!nombre || !telefono || !email || !categoria) {
    return 'Todos los campos son obligatorios';
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    return 'Correo electrónico inválido';
  }

  const regexTelefono = /^[0-9]{7,15}$/;
  if (!regexTelefono.test(telefono)) {
    return 'El teléfono debe contener entre 7 y 15 dígitos';
  }

  return null;
};

const getContacts = async (req, res) => {
  try {
    const contacts = await contactModel.getAllContacts();

    res.status(200).json({
      ok: true,
      data: contacts
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'Error interno del servidor'
    });
  }
};

const createContact = async (req, res) => {
  try {
    const errorValidacion = validarContacto(req.body);

    if (errorValidacion) {
      return res.status(400).json({
        ok: false,
        message: errorValidacion
      });
    }

    const insertId = await contactModel.createContact(req.body);

    res.status(201).json({
      ok: true,
      message: 'Contacto creado correctamente',
      id: insertId
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'Error interno del servidor'
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;

    const errorValidacion = validarContacto(req.body);

    if (errorValidacion) {
      return res.status(400).json({
        ok: false,
        message: errorValidacion
      });
    }

    const updated = await contactModel.updateContact(id, req.body);

    res.status(200).json({
      ok: true,
      message: 'Contacto actualizado',
      updated
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'Error interno del servidor'
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await contactModel.deleteContact(id);

    res.status(200).json({
      ok: true,
      message: 'Contacto eliminado',
      deleted
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      message: 'Error interno del servidor'
    });
  }
};

module.exports = {
  getContacts,
  createContact,
  updateContact,
  deleteContact
};
