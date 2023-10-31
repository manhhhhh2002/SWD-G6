import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'

// const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'congmanhbn20021@gmail.com',
//         pass: 'qardyyyewgoryvwe',
//     },
// });

// export const verifyEmail = async (email, verificationCode) => {
//     const mailOptions = {
//         from: 'congmanhbn20021@gmail.com',
//         to: email,
//         subject: 'Verify your email address',
//         text: `Please click on the following link to verify your email address: ${verificationCode}`,
//     };

//     await transporter.sendMail(mailOptions);
// };

// dotenv.config();
const MAIL_ADDRESS = process.env.MAIL_ADDRESS;

const sendEmail = (to, verificationCode) => {
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
    

    // const html = ejs.render(emailTemplate, templateData);
    let mailOptions = {
        from: from,
        to: to,
        subject: 'Verify your email address',
        html: `<p>Please click on the following link to verify your email address: ${verificationCode}</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
            return false;
        }
        console.log('Email sent successfully!');
        return true;
    });
}

export default sendEmail;
// sendEmail()