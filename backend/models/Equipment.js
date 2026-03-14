const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Equipment name is required'] },
    description: String,
    pricePerDay: { type: Number, required: [true, 'Price per day is required'] },
    images: [{ type: String }], // store file paths like /uploads/equipment/xxx.jpg
    available: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Equipment', equipmentSchema);
