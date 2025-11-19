export const userMiddleware = (req, res, next) => {
    const authHeader = req.headers["Authorization"];

    if (!authHeader) {
        return res.status(403).json({ msg: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Remove "Bearer"

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({ msg: "Invalid token" });
    }
};
