import express from 'express';
import Login from '../controllers/auth/login.controller.js';
import Register from '../controllers/auth/register.controller.js';
import {ResetPassword, ResetPasswordRequest} from '../controllers/auth/resetPassword.controller.js';
import VerifyAccount from '../controllers/auth/verifyAccount.controller.js';

const router = express.Router();

router.get('/login', Login);
router.post('/register', Register);
router.post('/forget-password', ResetPassword);
router.post('/reset-password-request', ResetPasswordRequest);
router.post('/verify-account/:verifyToken', VerifyAccount);

export default router;