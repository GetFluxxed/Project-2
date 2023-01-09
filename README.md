# Welcome to Pollen ![Brand Logo](/Img/pollen-logo.png)
Pollen is an online picture sharing platform where you can share your photos and see what all the buzz is about with your friends. The name Pollen was inspired by how bees of all types share pollen with their environments to spread natures love. Through Pollen, you have an open forum with all users around the world, or you can use Pollen for your own little collection or vault of pictures. 

### To Visit
To visit my website, click the visit https://pollen.herokuapp.com/

### To Use
To make your own version of Pollen, or to add to what I've started:
1. Clone down my repository.
2. In terminal, run npm init -y to initialize npm.
3. Then run npm i to install all required npm packages.
4. Next run touch .env.
5. Then run echo node_modules >> .gitignore and echo.env >> .gitignore.
6. Back in your console, run sequelize db:create and sequelize db:migrate to create a database and migrate the models.
7. You will now have the database "a_b" in psql.
8. In your console, type psql and \c a_b to connect to the database.
9. In a separate console tab, run npx nodemon (or just nodemon if you installed it globally) to start the application.
10. Go to http://localhost:3000/ in a browser to use the application.

## Project 2
The idea for my project two is something along the lines of a online picture forum, or something utilizing the Cloudinary API, pushing myself to go above and beyond in creating a user involved space, where individuals can create and post their own content, as well as view other posts from users with the capability of commenting and interacting. 


# User Stories
* As a User, I would like to be able to share pictures of my loved ones, animals or moments in time with other people on the internet.
* As a User, I would like to be able to create an account and manage my posts.
* As a User, I would like to be able to see other users posts, as well as being able to comment and interact with them.  

# What is the Cloudinary API
The Cloudinary API is an incredibly powerful media api, allowing you to store, transform, optimize and deliver all of your medias, wherever you like! It is extremely scalable, with the potential to support millions of product images and videos, contains a full family of other API's that offer flexibility, power, and agility when creating our stack.
Cloudinary API Spec's:
- 500 Admin API requests per hour
- Unlimited Uploads per hour

## Techstack
For this project the following languages, frameworks, and libraries will be used:
- JavaScript
  - Express.js
  - Cookie-Parser
  - Dotenv
  - EJS
- Databasing
  - Sequelize
  - Pg(PostgreSQL)
- HTML and CSS
  - Bulma
- Cyber Security
  - Bcrypt
  - Crypto-js
- Cloudinary API
  - Multer
  - Cloudinary
- DEVOPS
  - Heroku CLI
  - Sequelize CLI
# ERD's
![Pitch ERD](/Img/ERD.png)

# RESTful Routing
![RESTful Routing](/Img/RESTful.png)

# Wireframes
![Pitch Wireframe](/Img/Wireframe.png)


# MVP Goals
MVP for this website would be: 
- Safe user creation and obfusication of personal info.
  - User's can create accounts safely without the worry of their information being easily accessible.
- Capability to store user information in a database away from the users eye.
  - all necessary info should be storable, such as email and password, and additional data such as full name.
- Ability to upload, store, and comment on pictures posted by you or other users.

# Stretch Goals
Some major stretch goals in mind would be:
- User Interconnectivity through:
  - The implimentation of a friends list or chat system
  - Ability to 'like' a post and see aggregate numbers
- Make the layout of the website intuitive and create a nice user experience through:  
  - Utilizing more advanced frameworks and techniques like Bulma/Tailwind as opposed to Bootstrap.
  - Making windows flush and user friendly
- Continuous functionality improvements:
  - Email verification
  - A more user friendly post creation and comment creation system/streamlining processes.

# Post Project Reflection
This project was an absolute blast. I learned so much more about what I thought I knew a decent amount on, from:
 - Styling with Bulma being SO MUCH more enjoyable than vanilla CSS
 to
 - Complex rendering methods for forms, navbars, and other web items 
 and
 - Advanced image storage and retrieval in the cloud, with the ability to handle video's in the future,


I had so much fun during this project.
Some areas I need to work on for sure is tailoring image size, images are currently way too large, and there is no way for you to delete individual posts/comments yet. I am very proud of the way it turned out overall, and I put probably upwards of 40/50 hours of work into it, so I know for the next website I build, I will be able to half that time and become more and more efficient as my time as an engineer progresses.

