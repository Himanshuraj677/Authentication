import {Token, User} from '../../models/association.js';
import { sequelize } from '../../config/db.config.js';

const VerifyAccount = async(req, res) => {
  const {verifyToken} = req.params;
  if (!verifyToken) {
    return res.status(400).json({message: 'Invalid token'});
  }

  try {
    const token = await Token.findOne({where: {token: verifyToken}});
    if (!token) {
      return res.status(400).json({message: 'Invalid token'});
    }

    if (token.isVerified) {
      return res.status(400).json({message: 'Account already verified'});
    }

    if (token.expires < new Date()) {
      return res.status(400).json({message: 'Token expired'});
    }

    const t = await sequelize.transaction();
    try {
      await User.update({isVerified: true}, {where: {id: token.user_id}}, {transaction: t});
      await token.update({isVerified: true}, {transaction: t});
      await t.commit();
    } catch (error) {
      await t.rollback();
      return res.status(500).json({message: 'An error occurred while verifying account'});
    }

    return res.json({
      message: 'Account verified successfully', redirect: '/login'
    });
  }
  catch (error) {
    console.error('Verify Account Error:', error);
    return res.status(500).json({message: 'An error occurred while verifying account'});
  }
}

export default VerifyAccount;