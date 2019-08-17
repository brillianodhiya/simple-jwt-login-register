const express = require('express')
const Route = express.Router()

const userController = require('../controllers/')
const verify = require('../middleware/verify')

Route
  .post('/register', userController.regiset)
  .post('/login', userController.loginset)
  .get('/', verify,userController.auth)

module.exports = Route
