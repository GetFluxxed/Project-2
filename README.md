# Project 2
The idea for my project two is something along the lines of a online picture forum, or something along those lines utilizing the cloudinary api, pushing myself to go above and beyond in creating a user involved space, where individuals can create and post their own content, as well as view other posts from users with the capability of commenting and interacting. 

# User Stories
As a User, I would like to be able to share pictures of my loved ones, animals or moments in time with other people on the internet.
As a User, I would like to be able to create an account and manage my posts.
As a User, I would like to be able to see other users posts, as well as being able to comment and interact with them.  

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
  -Sequelize
  - Pg
- HTML and CSS
  - Bulma or Tailwind 
- Cyber Security
  - Bcrypt
  - Crypto-js

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
  - all necessary info should be storable, such as email and password, and additional data such as full name and birthdate.
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