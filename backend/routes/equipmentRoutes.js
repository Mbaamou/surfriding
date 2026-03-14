const express = require('express');
const {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} = require('../controllers/equipmentController');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getAllEquipment);
router.get('/:id', getEquipmentById);
router.post('/', authMiddleware, adminOnly, upload.array('images', 5), createEquipment);
router.put('/:id', authMiddleware, adminOnly, upload.array('images', 5), updateEquipment);
router.delete('/:id', authMiddleware, adminOnly, deleteEquipment);

module.exports = router;
