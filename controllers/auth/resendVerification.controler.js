import {User, Token} from '../../models/association.js';
import generateToken from '../../utility/generateToken.js';
import validator from 'validator';
import sendMail from '../../utility/sendMail.js';
import email_verify_template from '../../mail_template/email_verify_template.js';

const ResendVerificationController = async (req, res) => {
    const {email} = req.body;
    if (!email) {
      return res.status(400).json({message: 'Email is required'});
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({message: 'Invalid email'});
    }

    try {
        const user = await User.findOne({where: {email}});
    
        if (!user) {
          return res.status(400).json({message: 'User does not exist'});
        }
    
        if (user.isVerified) {
          return res.status(400).json({message: 'Account already verified'});
        }
    
        let token = await Token.findOne({where: {user_id: user.id, type: 'verify', isVerified: false}});
    
        if (!token) {
          return res.status(400).json({message: 'Token not found'});
        }
        
        let newToken = null;
        if (token.expires < new Date()) {
            newToken = generateToken();
            const expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
            await token.update({token: newToken, expires: expireTime});
        }
        sendMail(user.email, email_verify_template(newToken || token.token));
        return res.status(200).json({message: 'Verification email sent'});
    } catch (error) {
      console.error('Resend Verification Error:', error);
      return res.status(500).json({message: 'An error occurred while resending verification email'});   
    }
}

export default ResendVerificationController;