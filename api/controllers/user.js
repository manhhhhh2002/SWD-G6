import bcrypt from "bcrypt";
import db from '../database/db.js';
import { verifyEmail } from '../utils/email.js';
import jwt from 'jsonwebtoken'
const salt = 10;

const register = (req, res) => {
    // Check for email uniqueness
    const checkEmailSQL = "SELECT email FROM user WHERE email = ?";
    db.query(checkEmailSQL, [req.body.email], (err, result) => {
        if (err) {
            console.error('Error checking email uniqueness: ' + err);
            return res.json({
                Error: "Error checking email uniqueness"
            });
        }

        if (result.length > 0) {
            return res.json({
                Error: "Email is already in use"
            });
        }
        //000

        // Email domain verification
        const allowedDomains = ['gmail.com']; // Add your allowed domains
        const emailDomain = req.body.email.split('@')[1];
        if (!allowedDomains.includes(emailDomain)) {
            return res.json({
                Error: "Email domain not allowed"
            });
        }

        // Password length requirement
        if (req.body.password.length < 8) {
            return res.json({
                Error: "Password must be at least 8 characters long"
            });
        }

        // If all validation checks pass, proceed with registration
        const sql = "INSERT INTO user (`name`, `email`, `password`, `is_verified`) VALUES (?)";
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
            if (err) {
                console.error('Error hashing password: ' + err);
                return res.json({
                    Error: "Error hashing password"
                });
            }

            const verificationCode = generateVerificationCode();
            const values = [
                req.body.name,
                req.body.email,
                hash,
                verificationCode
            ];

            db.query(sql, [values], (err, result) => {
                if (err) {
                    console.error('Error inserting data into the database: ' + err);
                    return res.json({
                        Error: "Inserting data Error in server"
                    });
                }
                verifyEmail(req.body.email, verificationCode);

                return res.json({
                    Status: "Success"
                });
            });
        });
    });
};


const login = (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [req.body.email], (error, data) => {
        if (error) return res.json({ Error: 'Login error in server' });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (error, response) => {
                if (error) return res.json({ Error: 'Password compare error!' });
                if (response) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, 'jwt-secret-key', { expiresIn: '1d' });
                    res.cookie('token', token);
                    res.cookie('name', name);
                    return res.json({ Status: 'Success' });
                } else {
                    return res.json({ Error: 'Password not matched' });
                }
            })
        } else {
            return res.json({ Error: 'No email existed' });
        }
    })
}

async function generateVerificationCode() {
    const digits = '0123456789';
    let verificationCode = '';

    for (let i = 0; i < 6; i++) {
        verificationCode += digits[Math.floor(Math.random() * digits.length)];
    }

    return verificationCode;
}



export default { register, login };
