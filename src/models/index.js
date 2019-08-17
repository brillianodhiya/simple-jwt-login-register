const conn = require('../config/')

module.exports = {
  findUserByEmail: (email) => new Promise((resolve, reject) => {
    conn.query('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      !err ? resolve(row) : reject(err)
    })
  }),
  createUser: (user) => new Promise((resolve, reject) => {
    conn.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', user, (err, result) => {
      !err ? resolve(result) : reject(err)
    })
  })
}
