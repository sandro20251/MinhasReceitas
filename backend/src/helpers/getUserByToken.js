const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUserByToken = async (token) => {
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
    } catch (err) {
        return null;
    }
};

module.exports = getUserByToken;