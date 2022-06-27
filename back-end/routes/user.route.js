const express = require('express');
const {
  addUser,
  getUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/add-user', addUser);
router.get('/list-user', getUser);
router.delete('/delete/:id', deleteUser);
router.post('/edit/:id', updateUser);

module.exports = { routes: router };
