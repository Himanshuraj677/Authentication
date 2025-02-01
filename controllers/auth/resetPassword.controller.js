import {User, Token } from '../../models/association.js';
import { hashPassword } from '../../utility/password.js';
import sendMail from '../../utility/sendMail.js';
import generateToken from '../../utility/generateToken.js';
import passwordResetTemplate from '../../mail_template/password_reset_template.js';
import { sequelize } from '../../config/db.config.js';

const ResetPassword = async (req, res) => {
  const { password, resetToken } = req.body;

  if (!password || !resetToken) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const token = await Token.findOne({ where: { token: resetToken, type: 'reset', isVerified: false } });

  if (!token || token.isVerified) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  if (token.expires < new Date()) {
    return res.status(400).json({ message: 'Token expired' });
  }

  const t = await sequelize.transaction();
  try {
    const user = await User.findOne({ where: { id: token.user_id } });
    const hashedPassword = await hashPassword(password);
    await user.update({ password_hash: hashedPassword }, { transaction: t });
    await token.update({ isVerified: true }, { transaction: t });
    await t.commit();
    return res.json({ message: 'Password reset successful' });

  } catch (error) {
    await t.rollback();
    console.error('Reset Password Error:', error);
    return res.status(500).json({ message: 'An error occurred while resetting password' });
  }
}

const ResetPasswordRequest = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const user = await User.findOne({ where: { email } });

  
  if (!user) {
    return res.status(400).json({ message: 'User does not exist' });
  }
  
  if (!user.isVerified) {
    return res.status(400).json({ message: 'User not verified', isVerified: false, redirect: '/verify-email' });
  }

  const resetToken = generateToken();
  const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
  try {
    const token = await Token.create({token: resetToken, user_id: user.id, type: 'reset', expires: expireTime});
  
    sendMail(email, passwordResetTemplate(resetToken));
    return res.json({ message: 'Reset password link sent to email' });
    
  } catch (error) {
    console.error('Reset Password Request Error:', error);
    return res.status(500).json({ message: 'An error occurred while resetting password' });
  }
}

export {ResetPassword, ResetPasswordRequest};