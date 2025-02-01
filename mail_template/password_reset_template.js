import dotenv from 'dotenv';

dotenv.config();

const passwordResetTemplate = (token) => {
    const RESET_LINK = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    return {
        text: `Hello,\n\nWe received a request to reset your password. Click the link below to set a new password:\n\n${RESET_LINK}\n\nIf you did not request this, please ignore this email. Your password will remain unchanged.\n\nIf you need help, contact us at`,
        html: `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
            text-align: center;
        }
        p {
            color: #555;
            line-height: 1.6;
            text-align: center;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 12px;
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 20px;
        }
        .footer a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        <a href="${RESET_LINK}" class="button">Reset Password</a>
        <p>If you did not request this, please ignore this email. Your password will remain unchanged.</p>
        <p class="footer">If you need help, contact us at <a href="mailto:support@yourcompany.com">support@yourcompany.com</a></p>
    </div>
</body>
</html>
    `};
}

export default passwordResetTemplate;