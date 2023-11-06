import express from 'express';
const router = express.Router();
import projectDAO from '../DAO/projectDAO.js';

router.post('/create', (req, res) => {
    const { id, name, des, mem, status } = req.body;
    projectDAO.createProject(id, name, des, mem, status, (err, data) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }
        return res.json(data);
    });
});

router.put('/update/:id', (req, res) => {
    const { name, des, mem, status } = req.body;
    const id = req.params.id;
    projectDAO.updateProject(id, name, des, mem, status, (err, data) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }
        return res.json(data);
    });
});

router.delete('/project/:id', (req, res) => {
    const id = req.params.id;
    projectDAO.deleteProject(id, (err, data) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }
        return res.json(data);
    });
});

export default router;