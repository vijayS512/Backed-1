const nodemailer = require("nodemailer")

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD
    }
})

const sendEmail = async (email, otp) => {
  try {
    const info = await transport.sendMail({
      from: process.env.USER,
      to: email,
      subject: `Your LMS Login OTP`,
      html : `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    body {
      margin: 0;
      padding: 40px 20px;
      background: #f5f7fb;
      font-family: Arial, Helvetica, sans-serif;
    }

    .card {
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      border-radius: 12px;
      padding: 40px 30px;
      text-align: center;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
    }

    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 25px;
    }

    .title {
      margin: 0 0 15px;
      color: #222222;
      font-size: 26px;
    }

    .message {
      color: #666666;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 25px;
    }

    .otp {
      display: inline-block;
      background: #f0f4ff;
      color: #2563eb;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 8px;
      padding: 15px 25px;
      border-radius: 8px;
      margin: 10px 0 25px;
    }

    .expiry {
      color: #888888;
      font-size: 13px;
      margin-bottom: 25px;
    }

    .security {
      background: #fff7ed;
      border-left: 4px solid #f97316;
      padding: 12px;
      text-align: left;
      color: #7c2d12;
      font-size: 13px;
      line-height: 1.5;
      border-radius: 4px;
    }

    .footer {
      margin-top: 30px;
      color: #999999;
      font-size: 12px;
      line-height: 1.5;
    }
  </style>
</head>

<body>

  <div class="card">

    <div class="logo">
      LMS Portal
    </div>

    <h1 class="title">
      Login Verification
    </h1>

    <p class="message">
      Use the One-Time Password below to complete your login.
    </p>

    <div class="otp">
      ${otp}
    </div>

    <div class="expiry">
      This OTP will expire in 10 minutes.
    </div>

    <div class="security">
      <strong>Security Notice:</strong><br>
      Never share this OTP with anyone. Our team will never ask you
      for your OTP or password.
    </div>

    <div class="footer">
      If you did not attempt to log in, you can safely ignore this email.
      <br><br>
      © LMS Portal
    </div>

  </div>

</body>
</html>
`
    });

    console.log("Message sent:", info.messageId);
    console.log("Response:", info.response);

  } catch (error) {
    console.error("Email error:", error);
  }
};


module.exports = sendEmail;