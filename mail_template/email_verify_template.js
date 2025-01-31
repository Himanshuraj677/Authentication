const email_verify_template = (verify_token) => {
  const frontend_url = process.env.FRONTEND_URL;
  const VERIFY_LINK = `${frontend_url}/verify-email/${verify_token}`;
  return {
    text: `Hi,\n\nThank you for signing up! Please verify your email by clicking the link below:\n\n${VERIFY_LINK}\n\nIf you did not request this, please ignore this email.\n\nThis link will expire in 24 hours.`,
    html: `
    <!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .button {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            display: inline-block;
            margin-top: 20px;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Email Verification</h2>
        <p>Hi,</p>
        <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
        <a href="${VERIFY_LINK}" class="button">Verify Email</a>
        <p>If you did not request this, please ignore this email.</p>
        <p class="footer">If the button doesn't work, copy and paste this link into your browser:</p>
        <p class="footer"><a href="${VERIFY_LINK}">${VERIFY_LINK}</a></p>
        <p class="footer">This link will expire in 24 hours.</p>
    </div>
</body>
</html>
    `,
  };
};

export default email_verify_template;
