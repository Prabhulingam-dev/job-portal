import jobsModel from "../models/jobsModel.js";
import mongoose from 'mongoose'

export const createJobController = async (req, res, next) => {
    try {
        const { position, company } = req.body
        if (!position || !company) {
            next('provide position and company details')
        }
        req.body.createBy = req.user.userid;
        const job = await jobsModel.create(req.body);
        res.status(201).json({ job })
    }
    catch (error) {
        next('job error')
    }
}
//  GET JOB
export const getJobsController = async (req, res, next) => {
    // const jobs = await jobsModel.find({ createBy: req.user.userid })
    try {
        const { status, workType, search, sort } = req.query
        const queryObject = {
            createdBy: req.user.userid
        }
        // logic filters
        if (status && status !== 'all') {
            queryObject.status = status
        }
        if (workType && workType !== 'all') {
            queryObject.status = workType
        }
        if (search) {
            queryObject.position = { $regex: search, $options: "i" }
        }
        let queryResult = jobsModel.find(queryObject)
        // sorting
        if (sort === 'latest') {
            queryResult = queryResult.sort("-createdAt")
        }
        if (sort === 'oldest') {
            queryResult = queryResult.sort("createdAt")
        }
        if (sort === 'a-z') {
            queryResult = queryResult.sort("position")
        }
        if (sort === 'z-a') {
            queryResult = queryResult.sort("-position")
        }
    

        const jobs = await queryResult
        res.status(200).json({
            totaljobs: jobs.length,
            jobs
        })
    }
    catch (error) {
        next('error in get')
    }

}

// UPDATE JOB CONTROL

export const updateJobController = async (req, res, next) => {
    try {
        const { id } = req.params
        const { company, position } = req.body
        //validation
        if (!company || !position) {
            next('provide comapny and position')
        }
        //find job
        const job = await jobsModel.findOne({ _id: id })
        //validation 
        if (!job) {
            next(`no job found with this id${id}`)
        }
        // if (req.user.userid === job.createdBy.toString()) {
        //     next('you are not authorzed to update ')
        //     return
        // }
        const updatejob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({ updatejob })
    }
    catch (error) {
        next('error in update')
    }
}

//delete job controller

export const deleteJobController = async (req, res, next) => {
    try {
        const { id } = req.params

        const job = await jobsModel.findOne({ _id: id })
        //validate
        if (!job) {
            next('you are not authorize to delete this job')
        }
        await job.deleteOne()
        res.status(200).json({
            message: 'job,successfully deleted'
        })
    }
    catch (error) {
        next('error in delete')
    }

}

// job stats and filter

export const jobStatsController = async (req, res, next) => {
    try {
        const stats = await jobsModel.aggregate([{
            // search by user job
            $match: {
                createdBy: new mongoose.Types.ObjectId(req.user.userid)
            },
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
        ])
        // default stats
        const defaultStats = {
            pending: stats.pending || 0,
            reject: stats.reject || 0,
            interview: stats.interview || 0
        }
        res.status(200).json({ totaljobs: stats.length, stats })
    }
    catch (error) {
        next('error in stats filter')
    }
};