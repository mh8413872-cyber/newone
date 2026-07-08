const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: 'Token Missing'
        });
    }

    try {

        const decoded = jwt.verify(
            token,
            'mysecretkey'
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: 'Invalid Token'
        });
    }
};

module.exports = verifyToken;