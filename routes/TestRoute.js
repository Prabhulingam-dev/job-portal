import express from 'express'
import { testPostController } from '../controller/testController.js'
import userAuth from '../middleware/authMiddleware.js'
//router object
const router = express.Router()

router.post('/test-post', userAuth, testPostController)

export default router