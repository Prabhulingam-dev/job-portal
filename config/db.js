import mongoose from 'mongoose'
import colors from 'colors'

const connectDb = async () =>{
    try{
        const conn = await mongoose.connect(process.env.job_url)
        console.log(`mongodb connect successfull ${conn.connection.host} `.bgMagenta)
    }
    catch(error){
        console.log(`mongodb error ${error}`.bgRed)
    }
}

export default connectDb