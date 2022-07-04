const User = require('../models/user');

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.save();
    return res.status(201).json({
      message: 'succès',
      user,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUser = async (req, res) => {
  const user = await User.find();
  User.find()
    .then((data) => {
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
  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: ` id=${id} ne peut pas etre supprimer`,
        });
      } else {
        res.send({
          message: 'suppression user avec succes!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'error',
      });
    });
};

const updateUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Les données à modifiers ne peuvent pas etre vide',
    });
  }
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else
        res.send({
          message: `Product  with id=${id} update avec succes.`,
          data,
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Erreur updating user with id=' + id,
      });
    });
};

module.exports = {
  addUser,
  getUser,
  deleteUser,
  updateUser,
};
