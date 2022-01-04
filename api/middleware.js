const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

authenticateJWT = function(request, response, next) {
    // Gather the jwt access token from the request header
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (token == null) return response.sendStatus(401); // if there isn't any token
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return response.sendStatus(403)
        request.user = user
        next() // pass the execution off to whatever request the client intended
    });
};

module.exports = authenticateJWT;