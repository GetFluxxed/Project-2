
// required packages
require('dotenv').config()
const express = require('express')


// app config
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')


// routes and controllers
app.get('/', function (req, res) {
    res.render('home.ejs')
})

// \listen on port
app.listen(PORT, function () {
    console.log('HANDS IN THE AYERRRRRRRRRR')
})

