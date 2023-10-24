import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/email.js';
import {userDatabase} from '../DAO/indexDAO.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const result = await userDatabase.checkEmailUniqueness(email);

        if (result.length > 0) {
            return res.json({ Error: "Email is already in use" });
        }

        const allowedDomains = ['gmail.com']; // Add your allowed domains
        const emailDomain = email.split('@')[1];
        if (!allowedDomains.includes(emailDomain)) {
            return res.json({ Error: "Email domain not allowed" });
        }

        if (password.length < 8) {
            return res.json({ Error: "Password must be at least 8 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password.toString(), userDatabase.salt);
        const verificationCode = userDatabase.generateVerificationCode();
        const user = { name, email, password: hashedPassword, is_verified: verificationCode };

        const insertResult = await userDatabase.insertUser(user);
        sendEmail(email, verificationCode);

        return res.json({ Status: "Success" });
    } catch (err) {
        console.error('Error during registration: ' + err);
        return res.json({ Error: "Error in server" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userData = await userDatabase.getUserByEmail(email);
        
        if (userData.length > 0) {
            checkPassword(password, userData[0], res);
        } else {
            return res.json({ Error: 'No email existed' });
        }
    } catch (err) {
        console.error('Error during login: ' + err);
        return res.json({ Error: 'Login error in server' });
    }
};

function checkPassword(plainPassword, user, res) {
    bcrypt.compare(plainPassword.toString(), user.password, (error, response) => {
        if (error) return res.json({ Error: 'Password compare error!' });

        if (response) {
            if (user.is_verified != 1) {
                console.log(user.is_verified);
                return res.json({ Error: 'You need to verify your email address first' });
            } else {
                const name = user.name;
                const token = jwt.sign({ name }, 'jwt-secret-key', { expiresIn: '1d' });
                res.cookie('token', token);
                res.cookie('name', name);
                return res.json({ Status: 'Success' });
            }
        } else {
            return res.json({ Error: 'Password not matched' });
        }
    });
}

const verify = async (req, res) => {
    const code = req.body.code;

    try {
        const user = await userDatabase.getUserByVerificationCode(code);

        if (user.length === 0) {
            return res.json({ Error: 'Invalid verification code' });
        }

        user[0].is_verified = true;
        const updateResult = await userDatabase.updateUserVerificationStatus(user[0].id, user[0].is_verified);

        return res.json({ message: 'Success' });
    } catch (err) {
        console.error('Error during verification: ' + err);
        return res.status(500).json({ error: 'Error updating database' });
    }
};

export default { register, login, verify };
