const User = require('../models/user.model');
exports.findUsers = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                status: 'available',
            }
        })
        return res.status(200).json({
            results: user.length,
            status: "success",
            message: "User found",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status: '404 Not Found',
            message: "Error finding user"
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        
        const user = await User.create({
            name,
            email,
            password,
            role
        })

        return res.status(200).json({
            message: "User created",
            user
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Fail',
            message: "Failed to create user",
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email } = req.body
        const user = await User.findOne({
            where: {
                status: true,
                id
            }
        })
        if (!user) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found',
            })
        }

        await user.update({name, email})
        
        return res.status(200).json({
            status: 'OK',
            message: 'User updated',
            user
        })
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Fail updated user"
        })       
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({
            where: {
                status: true,
                id
            }
        })
        if (!user) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found',
            })
        }

        await user.update({status: false})
       
        return res.status(200).json({
            status: 'OK',
            message: 'User deleted'
        })
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Fail deleted user"
        })       
    }
}

exports.findUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({
            where: {
                status: true,
                id
            }
        })
        if (!user) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found',
            })
        }
       
        return res.status(200).json({
            status: 'OK',
            message: 'User found',
            user
        })
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "User not fond"
        })       
    }
}