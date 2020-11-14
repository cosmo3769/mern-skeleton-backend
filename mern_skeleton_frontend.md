# mern_skeleton_frontend

The topics covered are:

* Frontend features of the skeleton

* Setting up development with React, React Router and Material-UI

* Rendering a home page built with React

* Backend user API integration

* Auth integration for restricted access

* User list, profile, edit, delete, sign up, and sign in UI to complete the user frontend

* Basic server-side rendering

## Defining the skeleton application frontend

We will add the following **user interface components** to our base aplication:

* Home page: A view that renders at the **root URL** to **welcome users to the web application**.

* Sign-up page: A view with a form for **user sign-up**, allowing **new users to create a user account** and redirecting them to a sign-in page when successfully created.

* Sign-in page: A view with a **sign-in** form that allows **existing users to sign in so they have access to protected views and actions**.

* User list page: A view that fetches and shows a **list of all the users** in the database, and also **links to individual user profiles**.

* Profile page: A component that fetches and displays an **individual user's information**. This is only accessible by signed-in users and also **contains edit and delete options, which are only visible if the signed-in user is looking at their own profile**.

* Edit profile page: A form that fetches the **user's information to prefill the form fields**. This allows the user to **edit the information and this form is accessible only if the logged-in user is trying to edit their own profile**.

* Delete user component: An option that allows the **signed-in user to delete their own profile** after confirming their intent.

* Menu navigation bar: A component that lists all the **available and relevant views to the user**, and also helps to indicate the **user's current location in the application**.

![React Component Tree Diagram](https://github.com/piyush-cosmo/mern-social/blob/master/images/react_component_tree_diagram.png)

This is the **React component tree diagram** which shows all the React components we will develop to build out the views for this base application: **MainRouter** will be the main React component. This contains all the other custom React views in the application. **Home, Signup, Signin, Users, Profile, and EditProfile** will render at individual routes declared with React Router, whereas the **Menu** component will render across all these views. **DeleteUser** will be a part of the **Profile** view.

## Folder and File structure

| mern_skeleton/

| -- client/

| --- assets/

| ---- images/

| --- auth/

| ---- api-auth.js

| ---- auth-helper.js

| ---- PrivateRoute.js

| ---- Signin.js

| --- core/

| ---- Home.js

| ---- Menu.js

| --- user/

| ---- api-user.js

| ---- DeleteUser.js

| ---- EditProfile.js

| ---- Profile.js

| ---- Signup.js

| ---- Users.js

| --- App.js

| --- main.js

| --- MainRouter.js

| --- theme.js

| -- server/

| --- devBundle.js

| -- webpack.config.client.js

| -- webpack.config.client.production.js

## Setting up for React Development
