// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()

// mount our routes on the router

// GET /user/new -- serves a form to create a new user
router.get('/new', function (req, res) {
    res.render('users/new.ejs')
})
// POST /users -- creates a new user from the form @ /users/new
router.post('/', async function (req, res) {
    try {
        // based on the info in the req.body, we need to check to see if a user exists in the database -- find or create a user
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            // TODO: dont add plaintext passwords to the db
            defaults: {
                password: req.body.password
            }

        })
        // TODO: redirect to the login page if the user is found  & log the user in(store the user's id as a cookie in the browser) || redirect to the home page
        res.cookie('userId', newUser.id)
        res.redirect('/')

    } catch (error) {
        console.log(error)
        res.status(500).send('server error')
    }
})

// GET /users/login -- render a login from that POSTs to /users/login
router.get('/login', function (req, res) {
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null
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
        } else if (user.password !== req.body.password) {
            // if the user's supplied password is incorrect
            res.redirect('/users/login?message=' + badCredentialMessage)
        } else {
            // if the user is found and their password matches log them in
            res.cookie('userId', user.id)
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
    }
})
// GET /users/logout -- clear any cookies and redirect to the homepage
router.get('/logout', function (req, res) {
    res.send('log the user out by clearing the cookie')
})
// export the router
module.exports = router
