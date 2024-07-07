# Steps to run this project

## I. Clone Repository

    clone this repository

## II. Setup Database Server

    Download and setup mongodb server in local

## II. Run Backend

    1. navigate to backend directory **cd backend**
    2. install npm packages **npm install**
    3. Update the MongoServer url and database name in **/backend/db.js**
    4. run server **node server.js**
    5. your server will be running on localhost:4000 post

## III. Run Frontend
    1. navigate to frontend directory **cd frontend**
    2. install npm packages **npm install**
    3. run the **next** server **npm run dev**
    4. your fronted will be running on localhost:3000


### working
    1. admins sign in using default email and password
    **Email** ***admin@gmail.com***
    **Password** ***admin***

    2.server respond using jwt token
    3.will authnenticate to view cms
    4.in cms page can do crud operation, Create,read,update and delete


functionalities used
> api limitter
> jwt
> Redis for cache
> bcrypt for hashing
> validator (on both frontend and backend)
