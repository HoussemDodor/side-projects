# MERN Boilerplate for New Projects

The purpose of this repository is to make it easier to launch new ideas using the MERN stack. The boilerplate contains basic functionality and components which can be used in your project. You can find a chapter in this file which explains how to set up your project and how to deploy it. 

#### About MERN
MERN is a tech stack which includes MongoDB, Express, React, and Node.js. It is a relatively low entry point to start full-stack development. MongoDB is free, easy to set up, and scales easily as your project grows. Express is an easy way to set up an API. React is a personal preference, but it can be exchanged for your preferred framework.  

## List of Features
This is a list of features integrated into the MERN boilerplate:

#### Features to be Implemented
* User profile page
* Add Refresh token
* Add OAuth functionality
* Add Testing
* Make everything in the frontend fully responsive
* Add authorization based on roles
* Add an event logger and error logger in the backend 

#### Implemented
##### Frontend
* Login & Signup functionality
    * Uses JWT token
    * Passwords are salted and hashed
* Hero Icons is installed and available for use

##### Backend
* CORS is installed and handles CROSS origin requests
* User passwords get salted and hashed using bcrypt
* Serves a static page when accessed through a browser

## How to Set Up
The following steps explain how to get the boilerplate running on your local machine and start developing:

1. **Clone and connect your own repository**
2. **Run `npm install`**
3. **Add `.env` file**
4. **Name your project**

## How to Deploy the MERN App
The following steps explain how to deploy the MERN app:

1. **Create a new branch in your repository and name it `production`**
2. **Add your domain name to `allowedCors`**
3. **Remove the line `!origin` from `corsOptions`**

(Optional) Set up CI/CD pipeline in GitHub.

**Optimize Tailwind for production**  
For more information on optimizing Tailwind for production, visit:  
https://tailwindcss.com/docs/optimizing-for-production
