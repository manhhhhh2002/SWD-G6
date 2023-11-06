import db from '../dao/BaseDao.js';

class projectDAO {
    constructor() {
        this.db = db;
    }

    createProject(id, name, description, member, status, callback) {
        const sql = "INSERT INTO project (project_id, project_name, description, member, status) VALUES (?, ?, ?, ?, ?)";
        const values = [id, name, description, member, status];
        this.db.query(sql, values, callback);
    }

    updateProject(id, name, description, member, status, callback) {
        const sql = "UPDATE project SET project_name = ?, description = ?, member = ?, status = ? WHERE project_id = ?";
        const values = [name, description, member, status, id];
        this.db.query(sql, values, callback);
    }

    deleteProject(id, callback) {
        const sql = "DELETE FROM project WHERE project_id = ?";
        this.db.query(sql, [id], callback);
    }
}

export default projectDAO;