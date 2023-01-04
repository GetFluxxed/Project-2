// create an instance of express routers
const { render } = require('ejs')
const express = require('express')
const { Model } = require('sequelize')
const db = require('../models')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: './uploads/' })

// mount routes on the router

// GET /posts --view all posts

// GET /posts/new --show form for creation of new post

// POST /posts/new --creation of post in browser

// POST /posts/:id --create a comment on a post

// PUT /posts/edit --edit something about a previous post

// export the router
module.exports = router