import { sequelize } from "../config/db.config.js";
import {User, Token} from "../models/association.js";
import { createToken } from './authToken.js';
import generateToken from "./generateToken.js";

const RegisterUser = async (email, hashedPassword, name, username) => {
    const t = await sequelize.transaction(); // Start a transaction
    try {
        // Create user inside the transaction
        const user = await User.create(
            {name, email, username, password_hash: hashedPassword},
            { transaction: t }
        );

        // Generate auth token
        const authToken = createToken(user.id);

        // Generate Email verify Token
        const verifyToken = generateToken();

        // Set expiry time for the token
        const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

        // Store token in the database
        await Token.create(
            { user_id: user.id, token: verifyToken, type: 'verify', expires: expireTime },
            { transaction: t }
        );

        // Commit transaction if everything is successful
        await t.commit();
        return { user, authToken, verifyToken }; // Return created user & token
    } catch (error) {
        // Rollback transaction on failure
        await t.rollback();
        throw error; // Re-throw error to handle it in the calling function
    }
};

export default RegisterUser;