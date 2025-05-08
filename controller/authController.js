
import userModel from "../models/userModel.js"
//register
export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        //validator
        if (!name) {
            next('error in name')
        }
        if (!email) {
            next('error in email')
        }
        if (!password) {
            next('error in password')
        }
        const existingemail = await userModel.findOne({ email })
        if (existingemail) {
            next('user is already exists')
        }
        const user = await userModel.create({ name, email, password })
        //tokem
        const token = user.createJWT()
        res.status(200).send({
            success: true,
            message: 'user is successfully register',
            user: {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                location: user.location
            },
            token
        })
    }
    catch (error) {
        next(error)
    }
}

//login - controll

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            next('email or password is not provided')
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            next('invalid user credentails')
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            next('not matching of user or password')
        }
        //token
        const token = user.createJWT()
        //response
        res.status(200).json({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                location: user.location
            },
            token
        })
    }
    catch (error) {
        next(error)
    }
}