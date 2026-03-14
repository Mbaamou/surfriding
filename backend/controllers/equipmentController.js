const Equipment = require('../models/Equipment');
const fs = require('fs');
const path = require('path');

const getAllEquipment = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const equipment = await Equipment.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Equipment.countDocuments();

    res.status(200).json({
      success: true,
      data: equipment,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
};

const getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }
    res.status(200).json({ success: true, data: equipment });
  } catch (error) {
    next(error);
  }
};

const createEquipment = async (req, res, next) => {
  try {
    const { name, description, pricePerDay } = req.body;

    if (!name || !pricePerDay) {
      return res.status(400).json({
        success: false,
        message: 'Name and price per day are required',
      });
    }

    const images = req.files ? req.files.map(f => `/uploads/equipment/${f.filename}`) : [];

    const equipment = await Equipment.create({
      name,
      description,
      pricePerDay,
      images,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      success: true,
      message: 'Equipment created successfully',
      data: equipment,
    });
  } catch (error) {
    next(error);
  }
};

const updateEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    const { name, description, pricePerDay, available } = req.body;
    if (name) equipment.name = name;
    if (description) equipment.description = description;
    if (pricePerDay) equipment.pricePerDay = pricePerDay;
    if (available !== undefined) equipment.available = available;

    // Handle new images
    if (req.files && req.files.length > 0) {
      equipment.images = req.files.map(f => `/uploads/equipment/${f.filename}`);
    }

    await equipment.save();

    res.status(200).json({
      success: true,
      message: 'Equipment updated successfully',
      data: equipment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) {
      return res.status(404).json({ success: false, message: 'Equipment not found' });
    }

    // Delete image files
    equipment.images.forEach(imagePath => {
      const filePath = path.join(__dirname, '..', imagePath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    await Equipment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Equipment deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};
