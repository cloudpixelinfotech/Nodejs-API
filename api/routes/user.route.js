const express = require('express');
const jwt = require("jsonwebtoken");
const userRoutes = express.Router();
require('../middleware');

// Require User model in our routes module
let User = require('../models/user.model');

// Defined get data(index or listing) route
userRoutes.route('/').get(function (request, response) {
    User.findAll(function(err, user) {
        if (err) {
            response.send(err);
        } else {
            response.send(user);
        }
    });
});

// Defined edit route
userRoutes.route('/edit/:id').get(authenticateJWT, function (request, response) {
    let id = request.params.id;
    User.findById(id, function (err, user){
        response.json(user);
    });
});

// Defined add route
userRoutes.route('/add').post(function (request, response) {
    const user = new User(request.body);
    User.create(user, function (err, user){
        response.json(user);
    });
});

// Defined update route
userRoutes.route('/update/:id').put(function (request, response) {
    const user = new User(request.body);
    User.update(request.params.id, user, function (err, user){
        response.json(user);
    });
});

// Defined delete route
userRoutes.route('/delete/:id').delete(function (request, response) {
    let id = request.params.id;
    User.delete(id, function (err, user){
        response.json(user);
    });
});

// Defined login route
userRoutes.route('/login').post(function (request, response) {
    const { username, password } = request.body;
    if (username && password) {
        User.auth(username, password, function(err, user) {
            if (err) {
                response.send(err);
            } else {
                if (user.length > 0) {
                    // generate an access token
                    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' });
                    response.send({authenticated: true, token: accessToken, user: user});
                } else {
                    response.send('Incorrect Username and/or Password!');
                }
            }
        });
    } else {
        response.send('Please enter Username and Password!');
    }
});

module.exports = userRoutes;
