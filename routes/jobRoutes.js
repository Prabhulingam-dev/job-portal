import express from 'express'
import userAuth from '../middleware/authMiddleware.js'
import { createJobController, deleteJobController, getJobsController, jobStatsController, updateJobController } from '../controller/jobController.js'


const router = express.Router()

//router
//post-create
router.post('/create-job', userAuth, createJobController)

// get 
router.get('/get-job', userAuth, getJobsController)
//update-put / patch
router.patch('/update-job/:id', userAuth, updateJobController)
// delete
router.delete('/delete-job/:id', userAuth, deleteJobController)
//get stats filter
router.get('/job-stats', userAuth, jobStatsController)

export default router 