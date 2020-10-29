# mern_skeleton_backend

This is a skeleton of many applications:-

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

###### Starting the server 

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

###### Setting up Mongoose and connecting to MongoDB

We will be using the mongoose module to implement the user model in this skeleton, as well as all future data models for our MERN applications.

**npm install mongoose --save** 

**server/server.js** - Update the server.js file to import the mongoose module, configure it so that it uses native ES6 promises, and finally use it to handle the connection to the MongoDB database for the project.

```
import mongoose from 'mongoose'

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})
```

If you have the code running in development and also have MongoDB running, saving this update should successfully restart the server, which is now integrated with Mongoose and MongoDB.

***Mongoose is a MongoDB object modeling tool that provides a schema-based solution to model application data. It includes built-in type casting, validation, query building, and business logic hooks. Using Mongoose with this backend stack provides a higher layer over MongoDB with more functionality, including mapping object models to database documents. This makes it simpler and more productive to develop with a Node and MongoDB backend.***

**Now, we can add code to load an HTML view from this backend after we have our Express app configured, database integrated with Mongoose and a listening server ready.**

When I run **npm run development**, it goes to :

**nodemon -> webpack.config.server.js(babel.js) -> server.js(config.js && express.js) -> dist/server.generated.js(output after compilation and bundling)**

###### Serving an HTML template at a root URL

Incoming **request** at the root URL **/**

Serving **response** as an HTML template

**template.js** - JS function that returns a simple HTML document that will render Hello World on the browser screen.

```
export default () => {
    return `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>MERN Skeleton</title>
        </head>
        <body>
          <div id="root">Hello World</div>
        </body>
      </html>`
}
```

To serve this template at the root URL **/**, update the **express.js** file to import this template and send it in the response to a GET request for the "/" route.

Incoming request - **GET** request for root URL **/**

Serving response - **template.js(Hello World file)**

**express.js**

```
import Template from './../template'

//request-respone for root URL "/"
app.get('/', (req, res) => {
    res.status(200).send(Template())
})
```

Now, opening the root URL in a browser should show Hello World rendered on the page. The root URL for local machine is **http://localhost:3000/**

***Now, we have our minimal backend and frontend configured, getting known of the basic concepts of building a backend from scratch and the request-response method to render a simplistic HTML page on browser screen**

***Moving on, we can build on to add user-specific features.***

## Implementing the user model

###### Initialization

**server/models/user.model.js** - Schema Definition(user data fields) && Business Logic(password encryption, authentication, custom validation)

```
import mongoose, { mongo } from 'mongoose'

const UserSchema = new mongoose.Schema({

})

export default mongoose.model('User', UserSchema)
```

We will use the **mongoose** module to generate a UserSchema, which will contain the schema definition and user-related business logic to make up the user model. The **mongoose.Schema** function takes a schema definition object as a parameter to generate a new Mongoose schema object that will specify the properties or structure of each document in a collection.

###### User Schema Definition

The user schema definition object that's needed to generate the new Mongoose schema will declare all user data fields and associated properties. The schema will record user-related information including name, email, created-at and last-updated-at timestamps, hashed passwords, and the associated unique password salt.

* Name

The **name** field is a required field of the **String** type.

**server/models/user.model.js** - This field will store the user's name.

```
name: {
    type: String,
    trim: true,
    required: 'Name is required'
},
```

* Email

The **email** field is a required field of the **String** type.

**server/models/user.model.js** - The value to be stored in this email field must have a valid email format and must also be unique in the user collection.

```
email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
},
```

* Created and Updated Timestamps

The **created** & **updated** fields are **Date** values.

**server/models/user.model.js** - These Date values will be programmatically generated to record timestamps that indicate when a user is created and user data is updated.

```
created: {
    type: Date,
    default: Date.now
},
updated: Date,
```

* Hashed Password and Salt

The **hashed_password** and **salt** fields represent the encrypted user password that we will use for authentication.

**server/models/user.model.js** - The actual password string is not stored directly in the database for security purposes and is handled separately.

```
hashed_password: {
    type: String,
    required: "Password is required"
},
salt: String,
```

###### Business Logic(Password for auth)

This will deal with password encryption, authentication and custom validation.

* Handling the password string as a virtual field

The **password** field is very crucial for providing secure user authentication in any application, and each user password needs to be **encrypted**, **validated**, and **authenticated** securely as a part of the user model. The **password string** that's provided by the user is not stored directly in the user document. Instead, it is handled as a **virtual** field.

**server/models/user.model.js** - When the **password** value is received on user creation or update, it is **encrypted into a new hashed value** and **set to the hashed_password** field, along with the **unique salt value** in the **salt** field.

```
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
      return this._password
  })
```

* Encryption and Authentication

The **encryption logic** and **salt generation logic**, which are used to generate the **hashed_password** and **salt** values representing the **password** value, are defined as **UserSchema** methods.

**server/models/user.model.js** 

```
UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}
```

The **UserSchema** methods can be used to provide the following functionality:

**authenticate :** This method is called to **verify sign-in attempts** by matching the **user-provided password text** with the **hashed_password** stored in the database for a specific user.

**encryptPassword :** This method is used to generate an **encrypted hash** from the **plain-text password** and a **unique salt** value using the **crypto** module from Node.

**makeSalt :** This method generates a **unique and random salt** value using the **current timestamp** at **execution** and **Math.random()**.

*The* **crypto** *module provides a range of cryptographic functionality, including some standard cryptographic hashing algorithms. In our code, we use the* **SHA1 hashing algorithm** *and* **createHmac** *from* **crypto** *to generate the cryptographic* **HMAC hash** *from the* **password text** *and* **salt pair**.

***Why hashing algorithm uses salt?***

*Hashing algorithms generate the same hash for the same input value. But to ensure two users don't end up with the same hashed password if they happen to use the same password text, we pair each password with a unique* **salt** *value before generating the hashed password for each user. This will also make it difficult to guess the hashing algorithm being used because the same user input is seemingly generating different hashes.*

**sign-up(encryption)** - These UserSchema methods are used to encrypt the user-provided password string into a hashed_password with a randomly generated salt value. The hashed_password and the salt are stored in the user document when the user details are saved to the database on a create or update(sign-up or update the password when they forget it).

**sign-in(authentication)** - Both the hashed_password and salt values are required in order to match and authenticate a password string provided during user sign-in using the authenticate method.

**custom validation** - We should also ensure that the users select a strong password string to begin with, which can be done by adding custom validation to the passport field.

* Password Field Validation

To add validation constraints to the actual password string that's selected by the end user, we need to add **custom validation logic** and associate it with the **hashed_password** field in the schema.

**server/models/user.model.js** - We will ensure that password value is provided & password length is of at least 6 characters during sign-up or updating an existing password. This is acheived by adding custom validation logic to check the password value before Mongoose attempts to store the **hashed_password** value. If validation fails, the logic will return the relevant error message.

```
UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)
```
