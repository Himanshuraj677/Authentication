import jwt from 'jsonwebtoken';

const createToken = (id) => {
    const secret = process.env.JWT_SECRET;
    const payload = { id };
    return jwt.sign(payload, secret, { expiresIn: '30d' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;   
    } catch (error) {
        throw new Error('Token is invalid or expired');
    }
};


export { createToken, verifyToken };