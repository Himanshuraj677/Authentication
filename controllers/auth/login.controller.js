import { comparePassword } from "../../utility/password.js";
import { User } from "../../models/association.js";
import { createToken } from "../../utility/authToken.js";

const Login = async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({message: 'All fields are required'});
    }
    try {
      const user = await User.findOne({where: {email}});
      if (!user) {
        return res.status(400).json({message: 'User does not exist'});
      }
  
      const isMatch = await comparePassword(password, user.password_hash);
  
      if (!isMatch) {
        return res.status(400).json({message: 'Invalid credentials'});
      }
  
      const authToken = createToken(user.id);
  
      res.cookie('authToken', authToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
      });
  
      return res.status(200).json({message: 'Login successful'});  
    } catch (error) {
      console.error('Login Error:', error);
      return res.status(500).json({message: 'An error occurred while logging in'}); 
    }
}

export default Login;