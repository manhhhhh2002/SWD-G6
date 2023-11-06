import db from '../dao/BaseDao.js';

function getAllClass() {
    const query = "SELECT * FROM class";
    return new Promise((resolve, reject) => {
      db.query(query, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  function getClassById(id) {
    const query = "SELECT * FROM class WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  function createClassById(id) {
    const query = `
      INSERT INTO class 
      (class_name, class_description, class_status) 
      VALUES 
      (?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  function updateClassById(id) {
    const query = `
      UPDATE class 
      SET class_name = ?, 
          class_description = ?,
          class_status = ?
      WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  function deleteClassById(id) {
    const query = "DELETE FROM `class` WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }
  
  export default {
    getAllClass,
    getClassById,
    createClassById,
    updateClassById,
    deleteClassById,
  };