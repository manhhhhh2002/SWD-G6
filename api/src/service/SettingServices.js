import { settingDatabase } from '../dao/IndexDao.js';

async function getAllSetting(req, res) {
    try {
        const settings = await settingDatabase.getAllSetting();
        res.status(200).json({
            message: 'Get all settings successfully.',
            data: settings
        })
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        })
    }
}

async function addSetting(req, res) {
    try {
        const newSetting = {
            setting_id: req.body.setting_id,
            setting_name: req.body.setting_name,
            setting_type: req.body.setting_type
        };
        
        const addedSetting = await settingDatabase.addSetting(newSetting);

        res.status(201).json({
            message: 'Add setting successfully.',
            data: addedSetting
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}

async function updateSetting(req, res) {
    try {
        const newSetting = {
            setting_id: req.body.setting_id,
            setting_name: req.body.setting_name,
            setting_type: req.body.setting_type
        };
        
        const updateSetting = await settingDatabase.updateSetting(newSetting);

        res.status(200).json({
            message: 'Update setting successfully.',
            data: updateSetting
        });
    } catch (error) {
        res.status(500).json({
            message: error.toString()
        });
    }
}



export default { getAllSetting, addSetting, updateSetting }
