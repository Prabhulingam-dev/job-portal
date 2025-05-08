import userModel from "../models/userModel.js"

export const updateUserController = async (req, res, next) => {
    try {
        const { name, lastName, email, location } = req.body
        if (!name || !lastName || !email || !location) {
            next('provide the all fields')
        }
        const user = await userModel.findOne({ _id: req.user.userid })
        user.name = name
        user.lastName = lastName;
        user.email = email;
        user.location = location

        await user.save()
        const token = user.createJWT()
        res.status(200).json({
            user,
            token
        })
    }
    catch (error) {
        next('not found')
    }
}

