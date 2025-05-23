import express from 'express'
import { loginController, registerController } from '../controller/authController.js'

const router = express.Router()
//register || post
router.post('/register', registerController)
// login || post
router.post('/login', loginController)

export default router