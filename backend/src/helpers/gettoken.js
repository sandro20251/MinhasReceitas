const getToken = (req) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
        return null;
    }
    const token = headerToken.split(" ")[1];
    return token;
}

module.exports = getToken;