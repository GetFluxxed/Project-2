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
// export the router
module.exports = router
