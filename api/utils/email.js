import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'congmanhbn20021@gmail.com',
        pass: 'manhmanh@',
    },
});

export const verifyEmail = async (email, verificationCode) => {
    const mailOptions = {
        from: 'congmanhbn20021@gmail.com',
        to: email,
        subject: 'Verify your email address',
        text: `Please click on the following link to verify your email address: ${verificationCode}`,
    };

    await transporter.sendMail(mailOptions);
};
