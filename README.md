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
