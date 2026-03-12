const Equipment = require('../models/Equipment');

exports.createEquipment = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newEquipment = new Equipment({
      name,
      description,
      price,
      category,
      image: req.file ? req.file.path : null,
      owner: req.user.id
    });
    const equipment = await newEquipment.save();
    res.json(equipment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAllEquipment = async (req, res) => {
  try {
    const query = req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {};
    const equipment = await Equipment.find(query);
    res.json(equipment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
