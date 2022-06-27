const express = require('express');
const {
  addUser,
  getUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = express.Router();

router.post('/add-user', addUser);
router.get('/list-user', getUser);
router.delete('/delete/:id', deleteUser);

module.exports = { routes: router };
