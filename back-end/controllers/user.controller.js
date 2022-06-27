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
  const user = await User.find();
  User.find()
    .then((data) => {
      console.log(data);
      if (!data) {
        res.status(404).send({
          message: 'user null',
        });
      } else {
        return res.status(201).json(user);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error',
      });
    });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    User.findByIdAndRemove(id).then((data) => {
      if (!data) {
        res.status(404).send({
          message: ` id=${id} ne peut pas etre supprimer`,
        });
      } else {
        res.send({
          message: 'suppression user avec succes!',
        });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addUser,
  getUser,
  deleteUser,
};
