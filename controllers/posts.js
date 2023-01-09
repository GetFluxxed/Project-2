// create an instance of express routers
const { render } = require('ejs')
const express = require('express')
const { Model } = require('sequelize')
const db = require('../models')
const router = express.Router()
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
//==! mount routes on the router

// GET /posts/new --show form for creation of new post
router.get('/new', function (req, res) {
    res.render('posts/new.ejs')
})

// POST /posts/new --creation of post in browser
router.post('/new', upload.single('image'), async function (req, res) {
    // Get the data from the form submission

    const title = req.body.title
    const caption = req.body.caption
    // const visibility = req.body.visibility === 'true'

    // Get the logged-in user's ID
    const user = res.locals.user;
    // Upload the image to Cloudinary
    try {
        console.log(req.file.path)
        const result = await cloudinary.uploader.upload(req.file.path)
        cloudinary.image(`${req.file.path}`, { width: 70, height: 53, crop: "scale" })
        const imageUrl = result.secure_url

        // Save the data to the database
        const newPost = await db.post.findOrCreate({
            where: {
                title: title,
                // visibility: visibility,
                content: imageUrl,
                userId: user.dataValues.id,
                caption: caption,
            }
        })
        res.redirect('/')
    } catch (err) {
        res.status('error', err)
    }
})
// POST /posts/:id --create a comment on a post

// PUT /posts/edit --edit something about a previous post

// export the router
module.exports = router