// create an instance of express routers
const { render } = require('ejs')
const express = require('express')
const db = require('../models')
const router = express.Router()
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// mount our routes on the router

// GET /user/new -- serves a form to create a new user
router.get('/new', function (req, res) {
    res.render('users/new.ejs', {
        user: res.locals.user
    })
})
// POST /users -- creates a new user from the form @ /users/new
router.post('/', async function (req, res) {
    try {
        // based on the info in the req.body, we need to check to see if a user exists in the database -- find or create a user
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            where: {
                user_name: req.body.user_name
            },
            where: {
                email: req.body.email,
                user_name: req.body.user_name,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            }
        })
        // if user is found, redirect to login
        if (!created) {
            console.log('A user with this email or username already exists!')
            res.redirect('/users/new?message=Please log in to continue.')
        } else {
            // here we know it's a new user
            // hash the supplied password
            const hashedPassword = bcrypt.hashSync(req.body.password, 12)
            newUser.password = hashedPassword
            // save the user with the new password
            await newUser.save() // Actually save the new password in the db
            // encrypt the new user's id and convert it to a string
            const encryptedId = crypto.AES.encrypt(String(newUser.id), process.env.SECRET)
            const encryptedIdString = encryptedId.toString()
            // place the encrypted id in a cookie
            res.cookie('userId', encryptedIdString)
            // redirect to /users/profile
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

// GET /users/login -- render a login from that POSTs to /users/login
router.get('/login', function (req, res) {
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null,
        user: res.locals.user
    })
})
// POST /users/login -- ingest data from form rendered @ GET /users/login
router.post('/login', async function (req, res) {
    try {
        // look up the user based on their email
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        // boilerplate message if login fails
        const badCredentialMessage = 'username or password is incorrect'
        if (!user) {
            // if the user isnt found in the db
            res.redirect('/users/login?message=' + badCredentialMessage)
        } else if (!bcrypt.compareSync(req.body.password, user.password)) {
            // if the user's supplied password is incorrect
            res.redirect('/users/login?message=' + badCredentialMessage)
        } else {
            // encrypt the new user's id and convert it to a string
            const encryptedId = crypto.AES.encrypt(String(user.id), process.env.SECRET)
            const encryptedIdString = encryptedId.toString()
            // place the encrypted id in a cookie
            res.cookie('userId', encryptedIdString)
            // redirect to /users/profile
            res.redirect('/')
            // if the user is found and their password matches log them in
        }
    } catch (error) {
        console.log(error)

    }
})
// GET /users/logout -- clear any cookies and redirect to the homepage
router.get('/logout', function (req, res) {
    res.clearCookie('userId')
    // make a get req
    res.redirect('/')
})

// GET /profile -- show the user their profile page
router.get('/profile', async function (req, res) {
    if (!res.locals.user) {
        res.redirect('/users/login?message=You must authenticate before you are authorizzed to view this resource!')
    } else {
        const myPosts = await db.post.findAll({
            where: {
                userId: res.locals.user.dataValues.id
            }
        })
        res.render('users/profile.ejs', {
            user: res.locals.user,
            posts: myPosts
        })
    }
})

// POST /posts/new -- create a new post from the users tab
// router.post('/posts/new', upload.single('myFile'), function (req, res) {
//     res.send(req.file)
// })


// GET /users/posts  --check your posts
router.get('/posts', function (req, res) {
    res.render('posts.ejs')
})


// PUT /users/profile --Update bio
router.get('/profile/edit', async function (req, res) {
    res.render('users/edit.ejs', {
        user: res.locals.user
    })
})


// GET /users/comments --Check your comments
router.get('/comments', function (req, res) {
    res.render('comments.ejs')
})

// DELETE /users/posts --Delete a post

// DELETE /user/posts --Delete a comment

// DELETE /user --Delete user account
router.delete('/profile', async function (req, res) {
    const user = res.locals.user

    try {
        const deletePost = await db.post.destroy({
            where: {
                userId: user.dataValues.id
            }
        })
        const deleteComment = await db.comment.destroy({
            where: {
                userId: user.dataValues.id
            }
        })
        const deleteUser = await db.user.destroy({
            where: {
                id: user.dataValues.id
            }
        })
        res.redirect('/')
    } catch (error) {
        console.error(error)
    }
})


// export the router
module.exports = router
