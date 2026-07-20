const express = require('express');
const router = express.Router();
const TesteController = require('../controller/TesteController');

// rotas
router.post('/', TesteController.create2);
router.get('/', TesteController.read)

module.exports = router;