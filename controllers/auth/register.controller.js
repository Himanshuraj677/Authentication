import validator from 'validator';
import { Op } from 'sequelize';
import { hashPassword } from '../../utility/password.js';
import sendMail from '../../utility/sendMail.js';
import email_verify_template from '../../mail_template/email_verify_template.js';
import RegisterUser from '../../utility/user_register.js';
import User from '../../models/user.model.js';

const Register = async (req, res) => {
  const {name, email, username, password} = req.body;
  if (!name || !email || !username || !password) {
    return res.status(400).json({message: 'All fields are required'});
  }

  if (!validator.isLength(name, {min: 3, max: 50})) {
    return res.status(400).json({message: 'Name must be between 3 and 50 characters'});
  }

  if (!/^[A-Za-z]+( [A-Za-z]+)*$/.test(name.trim())) {
    return res.status(400).json({ message: 'Name must only contain letters and a single space between words' });
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
    const {_, authToken, verifyToken} = await RegisterUser(email, hashedPassword, name, username);
    sendMail(email, email_verify_template(verifyToken));
    res.cookie('authToken', authToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000
    });
    return res.status(201).json({message: 'User created successfully'});
  } catch (error) {
    return res.status(500).json({message: 'An error occurred while creating the user'});
  }
}

export default Register;