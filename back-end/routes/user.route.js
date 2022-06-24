const express = require('express');
const { addUser, getUser } = require('../controllers/user.controller');

const router = express.Router();

router.post('/add-user', addUser);
router.get('/list-user', getUser);

module.exports = { routes: router };
