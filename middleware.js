const jwt = require('jsonwebtoken');
const jwtSecret = 'my-jwt-secret-key';

let token;

//function to generate a JWT token
function generateToken(userId) {

    token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1m' });

    // // Set the token to the response header
    // res.set('Authorization', `Bearer ${token}`);

    return token;
}

function deleteToken() {
    token = "undefined"; // Declare the variable with let or const
}


// Function to authenticate a request using JWT
function AuthenticateJWT(req, res, next) {

    console.log(token);

    // If no token is found, return Unauthorized status
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    // Attempt to verify the token
    try{
        // Verify the token using the jwtSecret
        const decoded = jwt.verify(token, jwtSecret);
        // Assign the decoded user ID to the request object
        req.user = decoded.userId;
        // Proceed to the next middleware or route
        next();
    }catch(error){
        // If verification fails, return Forbidden status
        return res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = {
    generateToken,
    deleteToken,
    AuthenticateJWT
};
