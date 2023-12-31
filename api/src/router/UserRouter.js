import express from 'express'
import {userController} from '../service/IndexService.js'

const userRouter = express.Router();

userRouter.post('/register', userController.register)

userRouter.post('/login', userController.login)

userRouter.post('/verify', userController.verify);

export default userRouter;

