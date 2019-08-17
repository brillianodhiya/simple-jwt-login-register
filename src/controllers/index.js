const Users = require('../models/')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const SECRET_KEY = 'secretkey1412'

module.exports = {
  regiset: (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = bcrypt.hashSync(req.body.password) // encrypt using bcrypt

    Users.createUser([name, email, password])
      .then(result => {
        Users.findUserByEmail(email)
          .then(row => {
            Object.keys(row).forEach((key) => {
              const user = row[key] // manipulating object into array of obj
              const expireIn = 24 * 60 * 60 // expire one day 1 (60 * 60 is mean 1 mins and * 24)
              const accessToken = jwt.sign({
                id: user.id
              }, SECRET_KEY, {
                expiresIn: expireIn
              })
              res.status(200).cookie('token', accessToken, {
                expires: new Date(Date.now() + 1.116e+8) //if not using cookie delete  .cookie()
              }).header('Authorization', accessToken).send({
                user: user,
                access_token: accessToken,
                expire_in: expireIn
              })
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log('Email already taken'))
  },
  loginset: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    Users.findUserByEmail(email)
      .then(row => {
        Object.keys(row).forEach((key) => {
          const user = row[key]

          const result = bcrypt.compareSync(password, user.password) // decrypt using bcrypt
          if (!result) return res.status(401).send('User not Found')
          const expireIn = 24 * 60 * 60
          const accessToken = jwt.sign({
            id: user.id
          }, SECRET_KEY, {
            expiresIn: expireIn
          })
          // this is session
          //if (typeof(Storage) !== "undefined") { //check browser
          // sessionStorage.setItem('token', accessToken)
          //} else {
          // console.log('your browser not support web storage')
          // }
          res.status(200).cookie('token', accessToken, {
            expires: new Date(Date.now() + 1.116e+8) //if not using cookie delete .cookie()
          }).header('Authorization', accessToken).send({
            user: row,
            acces_token: accessToken,
            expires_in: expireIn
          })
        })
      })
      .catch(err => console.log(err))
  },
  auth: (req, res) => {
    res.status(200).send('This is an Authentication server')
  }
}