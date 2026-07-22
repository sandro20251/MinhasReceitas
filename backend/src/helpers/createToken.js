const jwt = require('jsonwebtoken');
require('dotenv').config()

const createToken = (user, req, res) => {
    const token = jwt.sign({
        id: user._id,
        name: user.name
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        })

    return token;
}

module.exports = createToken;