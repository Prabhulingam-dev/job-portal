import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'company name is required']
    },
    position: {
        type: String,
        required: [true, 'position name is required'],

    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['fulltype', 'parttime', 'internship', 'contract'],
        default: 'fulltype'
    },
    workLocation: {
        type: String,
        default: 'Mumbai',
        required: [true, 'work location is mandatory']
    },
    createBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


export default mongoose.model('Job', jobSchema)