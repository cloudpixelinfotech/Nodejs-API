const express = require('express');
const bodyparser = require('body-parser');
const PORT = process.env.PORT || 8000;
const userRoute = require('./routes/user.route');

// create express app
var app = express();

// configuring express server
app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

// define a root route
app.use('/users', userRoute);

// listen for requests
app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});
