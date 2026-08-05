const jwt = require('jsonwebtoken');
const { useTransition } = require('react');
require('dotenv')

const getUserByToken = async (token) => {
    try {
        const user = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        res.status(500).json({ message: err.message });
        return;
    }

    return user;

}

module.exports = getUserByToken;