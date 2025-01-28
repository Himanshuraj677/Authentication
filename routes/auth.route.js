import express from 'express';
import Login from '../controllers/auth/login.controller.js';
import Register from '../controllers/auth/register.controller.js';
import ForgetPassword from '../controllers/auth/forgetPassword.controller.js';
import ResetPassword from '../controllers/auth/resetPassword.controller.js';
import VerifyAccount from '../controllers/auth/verifyAccount.controller.js';

const router = express.Router();

router.get('/login', Login);
router.post('/register', Register);
router.post('/forget-password', ForgetPassword);
router.post('/reset-password', ResetPassword);
router.post('/verify-account', VerifyAccount);

export default router;