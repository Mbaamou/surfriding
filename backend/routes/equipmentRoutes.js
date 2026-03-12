const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', auth, upload, equipmentController.createEquipment);
router.get('/', equipmentController.getAllEquipment);

module.exports = router;
