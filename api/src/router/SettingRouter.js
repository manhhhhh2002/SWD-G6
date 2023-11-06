import express from 'express'
import {settingController} from '../service/IndexService.js'
import { ADMIN } from "../common/authoration.js";
import checkRole from "../service/BaseService.js";

const settingRouter = express.Router();
// checkRole.checkRole(ADMIN)
settingRouter.get('/', settingController.getAllSetting)
settingRouter.post('/', settingController.addSetting)
settingRouter.put('/:id', settingController.updateSetting)


export default settingRouter;

