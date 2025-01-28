import validator from 'validator';
import {User} from '../../models/association.js';
import { Op } from 'sequelize';
import { hashPassword } from '../../utility/password.js';
import { createToken } from '../../utility/authToken.js';
import sendMail from '../../utility/sendMail.js';
import generateToken from '../../utility/generateToken.js';

const Register = async (req, res) => {
  const {name, email, username, password} = req.body;
  if (!name || !email || !username || !password) {
    return res.status(400).json({message: 'All fields are required'});
  }

  if (!validator.isLength(name, {min: 3, max: 50})) {
    return res.status(400).json({message: 'Name must be between 3 and 50 characters'});
  }

  if (!validator.isAlpha(name)) {
    return res.status(400).json({message: 'Name must only contain letters'});
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({message: 'Invalid email'});
  }

  if (!validator.isAlphanumeric(username)) {
    return res.status(400).json({message: 'Username must be alphanumeric'});
  }

  if (!validator.isLength(username, {min: 3, max: 20})) {
    return res.status(400).json({message: 'Username must be between 3 and 20 characters'});
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({message: 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character'});
  }

  try {
    const user = await User.findOne({where: { [Op.or]: [{email}, {username}]}});
    if (user) {
      return res.status(400).json({message: 'User already exists with that email or username'});
    }
  } catch (error) {
    return res.status(500).json({message: 'An error occurred while checking for existing user'});
  }

  const hashedPassword = await hashPassword(password);
  try {
    const user = await User.create({name, email, username, password_hash: hashedPassword});
    const authToken = createToken(user.id);
    res.cookie('authToken', authToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
    const verifyToken = generateToken();
    sendMail(email, verifyToken);
    return res.status(201).json({message: 'User created successfully'});
  } catch (error) {
    return res.status(500).json({message: 'An error occurred while creating the user'});
  }
}

export default Register;