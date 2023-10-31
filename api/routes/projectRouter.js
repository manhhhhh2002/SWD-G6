import express from 'express'
import { userController } from '../services/indexServices.js'

const userRouter = express.Router();

userRouter.post('/post', userController.post)

userRouter.post('/verify', userController.verify);

export default userRouter;

