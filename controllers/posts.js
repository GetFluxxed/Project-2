// create an instance of express routers
const { render } = require('ejs')
const express = require('express')
const { Model } = require('sequelize')
const db = require('../models')
const router = express.Router()
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// mount routes on the router

// GET /posts --view all posts
router.get('/', function (req, res) {
    res.render('browse.ejs')
})

// GET /posts/new --show form for creation of new post
router.get('/new', function (req, res) {
    res.render('posts/new.ejs')
})

// POST /posts/new --creation of post in browser
router.post('/new', upload.single('image'), async function (req, res) {
    // Get the data from the form submission
    const title = req.body.title
    const caption = req.body.caption
    const visibility = req.body.visibility === 'true'

    // Get the logged-in user's ID
    const userId = res.locals.user

    // Upload the image to Cloudinary
    try {
        const result = await cloudinary.uploader.upload(req.file.path)
        const imageUrl = result.secure_url

        // Save the data to the database
        const newPost = new Post({
            title: title,
            visibility: visibility,
            content: imageUrl,
            user: userId,
            caption: caption,
        });
        await newPost.save()
        res.redirect('/posts')
    } catch (err) {
        res.status('error', { error: err }).send
    }
})

// POST /posts/:id --create a comment on a post

// PUT /posts/edit --edit something about a previous post

// export the router
module.exports = router