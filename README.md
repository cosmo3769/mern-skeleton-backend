# mern-social

First, we will be building a complete backend with CRUD features, auth with JWT web token.The completed backend will be a standalone server-side application that can handle HTTP
requests to create a user, list all users, and view, update, or delete a user in the database while taking user authentication and authorization into consideration.

## Feature Breakdown

We will add the following use cases with user CRUD and auth functionality implementations:

**Sign up**: Users can register by creating a new account using an email address.

**User list**: Any visitor can see a list of all registered users.

**Authentication**: Registered users can sign-in and sign-out.

**Protected user profile**: Only registered users can view individual user details after signing in. 

**Authorized user edit and delete**: Only a registered and authenticated user can edit or remove their own user account details.

## User Model

The user model will define the user details to be stored in the MongoDB database, and also handle user-related business logic such as password encryption and user data validation. It will have these attributes:

**name** - Required field to store the user's name.

**email** - Required unique field to store the user's email and identify each account (only one account allowed per unique email).

**password** - A required field for authentication. The database will store the encrypted password and not the actual string for security purposes.

**created** - Automatically generated timestamp when a new user account is created.

**updated** - Automatically generated timestamp when existing user details are updated.

## API endpoints for user CRUD

To enable and handle user CRUD operations on the user database, the backend will implement and expose API endpoints that the frontend can utilize in the views, as follows:

**Create a User** - /api/users (HTTP method - POST)

**List all users** - /api/users (HTTP method - GET)

**Fetch a user** - /api/users/:userId (HTTP method - GET)

**Update a user** - /api/users/:userId (HTTP method - PUT)

**Delete a user** - /api/users/:userId (HTTP method - DELETE)

**User sign-in** - /auth/signin (HTTP method - POST)

**User signout** - /auth/signout (HTTP method - GET)

Some api endpoints will use authentication so we will be using here is a jwt web token. We can also use session to store user state on both the client and server side. But jwt is a stateless authentication mechanism that does not require storing user state on the server side.

## Folder and File Structure

| mern_skeleton/

| -- config/

| --- config.js

| -- server/

| --- controllers/

| ---- auth.controller.js

| ---- user.controller.js

| --- helpers/

| ---- dbErrorHandler.js

| --- models/

| ---- user.model.js

| --- routes/

| ---- auth.routes.js

| ---- user.routes.js

| --- express.js

| --- server.js

| -- .babelrc

| -- nodemon.json

| -- package.json

| -- template.js

| -- webpack.config.server.js

## Initializing 

**npm init -y** - This will make a package.json file in the root directory to store meta information about the project, list module dependencies with version numbers, and to define run scripts.

## Development Dependencies

In order to begin the development process and run the backend server code, we will configure and install Babel, Webpack, and Nodemon.

###### Babel

Since we will be using ES6+ and the latest JS features in the backend code, we will install and configure Babel modules to convert ES6+ into older versions of JS so that it's compatible with the Node version being used.

**npm install @babel/core babel-loader @babel/preset-env --save-dev**

**.babelrc** - We'll configure Babel in the .babelrc file with presets for the latest JS features and specify the current version of Node as the target environment.

```
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": "current"
                }
            }
        ]
    ]
}
```

Setting targets.node to current instructs Babel to compile against the current version of Node and allows us to use expressions such as async/await in our backend code.

###### Webpack

We will need Webpack to compile and bundle the server-side code using Babel.

**npm install webpack webpack-cli webpack-node-externals --save-dev**

**webpack.config.server.js**

###### Nodemon

To automatically restart the Node server as we update our code during development, we will use Nodemon to monitor the server code for changes.

**npm install nodemon --save-dev**

**nodemon.json**

## Config Variables

**config/config.js** - we will define some server-side configuration-related variables that will be used in the code but should not be hardcoded as a best practice, as well as for security purposes.

The config variables that are defined are :

**env** - To differentiate between development and production modes.

**port** - To define the listening port for the server.

**jwtSecret** - The secret key to be used to sign JWT.

**mongoUri** - The location of the MongoDB database instance for the project.

These variables will give us the flexibility to change values from a single file and use it across the backend code.

## Running Scripts

**package.json** - Adding running script for development.

```
"scripts": {
    "development": "nodemon"
}
```

With this script added, running **npm run development** in the command line from your project folder will basically start Nodemon according to the configuration in nodemon.json. The configuration instructs Nodemon to monitor server files for updates and, on update, to build the files again, then restart the server so that the changes are immediately available.

## Preparing the server

In this, we will intefrate Express, Node and MongoDB in order to ru a completely configured server before we start implementing user-specific features.

###### Configuring Express

**npm install express**

**server/express.js** 

To handle HTTP request and serve responses properly, we will use the following modules to configure express: 

**body-parser** - Request body-parsing middleware to handle the complexities of parsing streamable request objects so that we can simplify browser-server communication by exchanging JSON in the request body.

**cookie-parser** - Cookie parsing middleware to parse and set cookies in request objects.

**compression** - Compression middleware that will attempt to compress response bodies for all requests that traverse through the middleware.

**helmet** - Collection of middleware functions to help secure Express apps by setting various HTTP headers.

**cors** - Middleware to enable cross-origin resource sharing (CORS).

To install all the packages run **npm install body-parser cookie-parser compression helmet cors --save**

Updating **express.js** to use these modules:

```
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

const app = express()

// parse body params and attach them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

export default app
```

The Express app can now accept and process information from incoming HTTP requests, for which we first need to start a server using this app.

## Starting the server 

**server/server.js** - With the Express app configured to accept HTTP requests, we can go ahead and use it to implement a server that can listen for incoming requests.

```
import config from './../config/config'
import app from './express'

app.listen(config.port, (err) => {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', config.port)
})
```

First, we import the config variables to set the port number that the server will listen on and then import the configured Express app to start the server. 

To get this code running and continue development, we can run npm run development from the command line. If the code has no errors, the server should start running with Nodemon monitoring for code changes. Next, we will update this server code to integrate the database connection.

## Setting up Mongoose and connecting to MongoDB

