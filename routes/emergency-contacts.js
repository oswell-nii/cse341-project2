const express = require('express');
const router = express.Router();

const econtactsController = require('../controllers/emergency-contacts');

router.get('/', econtactsController.getAll);

router.get('/:id', econtactsController.getSingle);

router.post('/', econtactsController.createContact);

router.put('/:id', econtactsController.updateContact);

router.delete('/:id', econtactsController.deleteContact);

module.exports = router;