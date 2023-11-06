import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

const MAIL_ADDRESS = process.env.MAIL_ADDRESS;

async function sendEmail(to, verificationCode) {
  let from = `G6 <${MAIL_ADDRESS}>`;
  console.log(from);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'congmanhbn20021@gmail.com',
      pass: 'qardyyyewgoryvwe'
    },
    from: from
  });

  let mailOptions = {
    from: from,
    to: to,
    subject: 'Verify your email address',
    html: `<p>Please click on the following link to verify your email address: ${verificationCode}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent successfully!', info);
    return info;
  } catch (error) {
    console.log('Error occurred:', error.message);
    throw error;
  }
}

function checkRole(allowedRoles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader.split(" ");
    const decoded = jwt.verify(token, "jwt-secret-key");
    const permission = decoded.role;
    console.log(decoded);
    if (allowedRoles.includes(permission)) {
      console.log("Check permission success with role: ", permission);
      next();
    } else {
      console.log("Check permission fail with role: ", permission);
      throw new Error("Authen permission denied");
    }
  };
}


export default { sendEmail, checkRole };
