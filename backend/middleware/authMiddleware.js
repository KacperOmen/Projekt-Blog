import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const requireAuth = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "Brak dostępu – zaloguj się" });
    }

    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if (err) {
            return res.status(401).json({ message: "Nieprawidłowy token" });
        }

        req.user = user;
        next();
    });
};