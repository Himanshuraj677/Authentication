import {User} from '../models/association.js'
import { verifyToken } from '../utility/authToken.js';

const AuthMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({message: 'Unauthorized'});
    }
}

export default AuthMiddleware;