'use strict' // using stric for not alowing declarating without variable

const express = require('express')
const bodyParser = require('body-parser')

const Route = require('./src/routes/')

const app = express()

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log('Server is running on port http://localhost:' + port)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/user', Route)
