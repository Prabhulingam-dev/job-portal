import mongoose from "mongoose";
import validator from 'validator'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    location: {
        type: String,
        default: 'India'
    }
}, { timestamps: true })

// middleware
userSchema.pre("save", async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch
}
//json web token
userSchema.methods.createJWT = function () {
    return JWT.sign({ userid: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}
export default mongoose.model('User', userSchema)