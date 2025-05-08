import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { updateUserController } from '../controller/userController.js'


//router objects
const router = express.Router()
//get  users

//update users

router.put('/update-user', userAuth, updateUserController)



export default router