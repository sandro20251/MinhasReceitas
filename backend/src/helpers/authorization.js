const jwt = require('jsonwebtoken');
const getToken = require('../helpers/gettoken');

const authorization = (req, res, next) => {
    const token = getToken(req);

    if (!token) {
        res.status(401).json({ message: "Token não encontrado" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Token inválido ou expirado"
        });
    }
}

module.exports = authorization;