// const express = require('express')
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import connectDb from './config/db.js'
import TestRoute from './routes/TestRoute.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'

dotenv.config()
const app = express()
//middileware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//mongodbConnection
connectDb()

//routes
app.use('/api/v1/test', TestRoute)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/job', jobRoutes)

//middleware
app.use(errorMiddleware)


// app.get("/",(req,res)=>{ 
//     res.status(200).send('<h1>welcome to my job portal</h1>')
// })

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`server is ${process.env.dev_mod} running on http://localhost:${port}`.bgYellow.white)
})