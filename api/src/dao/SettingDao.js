import db from '../dao/BaseDao.js';

function getAllSetting() {
    const sql = "SELECT * FROM setting";
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function addSetting(setting) {
    const sql = "INSERT INTO setting (`setting_id`, `setting_type`, `setting_name`) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.query(sql, [setting.setting_id, setting.setting_type, setting.setting_name], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function updateSetting(setting) {
    const sql = "UPDATE setting SET `setting_type` = ?, `setting_name` = ? WHERE setting_id = ?";
    return new Promise((resolve, reject) => {
        db.query(sql, [setting.setting_type, setting.setting_name, setting.setting_id], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}



export default {
    getAllSetting, addSetting, updateSetting
};
