import express from 'express'
import {classController} from '../service/IndexService.js'

const classRouter = express.Router();

classRouter.get("/", classController.getAll);
classRouter.get("/:id", classController.getClassById);
classRouter.post("/", classController.createClass);
classRouter.put("/:id", classController.updateClass);
classRouter.delete("/:id", classController.deleteClass);

export default classRouter;

