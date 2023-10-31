import db from '../common/db.js';

const salt = 10;

function generateVerificationCode() {
    const digits = '0123456789';
    let verificationCode = '';

    for (let i = 0; i < 6; i++) {
        verificationCode += digits[Math.floor(Math.random() * digits.length)];
    }

    return verificationCode;
}

function checkEmailUniqueness(email) {
    const checkEmailSQL = "SELECT email FROM user WHERE email = ?";
    return new Promise((resolve, reject) => {
        db.query(checkEmailSQL, [email], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function insertUser(user) {
    const sql = "INSERT INTO user (`name`, `email`, `password`, `is_verified`) VALUES (?)";
    return new Promise((resolve, reject) => {
        db.query(sql, [[user.name, user.email, user.password, user.is_verified]], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function getUserByEmail(email) {
    const sql = "SELECT * FROM user WHERE email = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [email], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function getUserByVerificationCode(code) {
    const sql = 'SELECT * FROM user WHERE is_verified = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [code], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function updateUserVerificationStatus(userId, isVerified) {
    const sql = 'UPDATE user SET is_verified = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [isVerified, userId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

export default {
    salt,
    generateVerificationCode,
    checkEmailUniqueness,
    insertUser,
    getUserByEmail,
    getUserByVerificationCode,
    updateUserVerificationStatus
};
