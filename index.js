
// required packages
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./models')
const crypto = require('crypto-js')
const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })
// const Post = require('./models/post')
const methodOverride = require('method-override')



// app config
const app = express()
const PORT = process.env.PORT || 3000
app.set('view engine', 'ejs')
// body parser middleware
app.use(express.urlencoded({ extended: false }))
// tell express to parse incoming cookies
app.use(cookieParser())
// tell express to allow the override methods
app.use(methodOverride('_method'))

// custom uth middleware that checks the cookies for a user id
// tell all downstream routes about this user
app.use(async (req, res, next) => {
    try {
        if (req.cookies.userId) {
            // decrypt the user id and turn it into a string
            const decryptedId = crypto.AES.decrypt(req.cookies.userId, process.env.SECRET)
            const decryptedString = decryptedId.toString(crypto.enc.Utf8)
            // the user is logged in, lets find them in the db 
            const user = await db.user.findByPk(decryptedString)
            // mount the logged in user on the res.locals
            res.locals.user = user
        } else {
            // set the logged in user to be null for conditional rendering
            res.locals.user = null
        }
        next()
    } catch (error) {
        console.log('AYER', error)
        next()
    }
})

// example of custom middleware

app.use((req, res, next) => {
    // our code goes here
    console.log(`incoming request:  ${req.method} - ${req.url}`)
    // res.locals are a place that we cna put data to share with 'downstream routes'
    // res.locals.myData = 'hello I am data'
    // invoke next to tell express to go to the next route or middle
    next()
})

// routes and controllers
app.get('/', async function (req, res) {
    console.log(res.locals)
    const posts = await db.post.findAll({
        order: [['createdAt', 'DESC']]
    })
    res.render('home.ejs', {
        user: res.locals.user,
        posts: posts
    })
})

// router.get('/', async function (req, res) {
//     try {
//         // Find all the posts in the database
//         const posts = await db.post.find().sort({ createdAt: 'desc' }).exec();
//         // Render the home page and pass the posts to the template

//     } catch (error) {
//         console.error(error)
//         res.send(error)
//     }
// });

app.use('/users', require('./controllers/users'))
app.use('/posts', require('./controllers/posts'))
// \listen on port
app.listen(PORT, function () {
    console.log('HANDS IN THE AYERRRRRRRRRR')
})

