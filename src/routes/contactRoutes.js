const express = require('express');
const router = express.Router();

const {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contactController');

router.get('/contacts', getContacts);
router.post('/contacts', createContact);
router.put('/contacts/:id', updateContact);
router.delete('/contacts/:id', deleteContact);

module.exports = router;
