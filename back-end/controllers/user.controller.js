const User = require('../models/user');

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.save();
    return res.status(201).json({
      message: 'succès',
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
  getUser,
};
