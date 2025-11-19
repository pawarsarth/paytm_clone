import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export const userMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (e) {
        return res.status(403).json({ message: "Invalid token" });
    }
};


