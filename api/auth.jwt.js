//auth.jwt.js is used to decrypt password hashes using the JWT_TOKEN in the env file
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

//Checks if the token is provided and the information provided is correct
    //Authenticates the user into the site
    //if not authenticated/token is not provided, the user is denied access and redirected
const authenticateToken = (req, res, next) => {

    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).json({ message: "Access Denied" })
    }

    jwt.verify(token, JWT_SECRET, (err, userData) => {

        if(err) {
            return res.status(403).json({ message: "Invalid or expired token" })
        }

        req.user = userData;
        next();

    })

}

module.exports = authenticateToken;
