import {classDatabase} from '../dao/IndexDao.js';


const getAll = async (req, res) => {
    const listClass = await classDatabase.getAllClass();
    res.status(201).json(listClass);
  };
  
  const getClassById = async (req, res) => {
    const id = req.params.id;
    const classData = await classDatabase.getClassById(id);
    res.status(201).json(classData);
  };
  
  const createClass = async (req, res) => {
    const data = req.body;
    const classData = await classDatabase.createClass(data);
    res.status(201).json(classData);
  };
  
  const updateClass = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const classData = await classDatabase.updateClassById(id, data);
    res.status(201).json(classData);
  };
  
  const deleteClass = async (req, res) => {
    const id = req.params.id;
    const classData = await classDatabase.deleteClassById(id);
    res.status(201).json(classData);
  };
  
  export default {
    getAll,
    getClassById,
    createClass,
    updateClass,
    deleteClass,
  };
  