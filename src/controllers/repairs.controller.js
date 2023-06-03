const { Op } = require('sequelize');
const Repair = require("../models/repair.model")

exports.findRepairs = async (req, res) => {
    try {
        const repairs = await Repair.findAll({
            where: {
                status: {
                    [Op.not] : "cancelled",
                },
            }
        })
        return res.status(200).json({
            results: repairs.length,
            status: "I's ok",
            message: "Repairs were successfully",
            repairs
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Repairs could not be found",
        })
    }
}

exports.createRepair = async (req, res) => {
    try {
        const { date, userId } = req.body
        console.log(date,userId)
        const repair = await Repair.create({
            date,
            userId
        })
        console.log("first")
        return res.status(200).json({
            message: "Repairs were successfully created",
            repair
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: "Repairs could not be created",
        })
    }
}

exports.findRepair = async (req, res) => {
    try {
        const { id } = req.params
        const repair = await Repair.findOne({
            where: {
                status: {
                    [Op.not] : "cancelled",
                },
                id
            }
        })
        if (!repair) {
            return res.status(404).json({
                status: "Not Found",
                message: "Repair could not found",
            })
        }
        return res.status(200).json({
            status: "OK",
            repair
        })
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Repairs could not be found",
        }) 
    }
}

exports.updateRepair = async (req, res) => {
    try {
        const { id } = req.params
        const repair = await Repair.findOne({
            where: {
                status: "pending",
                id
            }
        })
        if (!repair) {
            return res.status(404).json({
                status: "Not Found",
                message: "Repair could not found"
            })
        }
        
        await repair.update({status: "completed"})

        return res.status(200).json({
            status: "Ok",
            repair
        })
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: error.message,
        }) 
    }
}

exports.deleteRepair = async (req, res) => {
    try {
        const { id } = req.params
        const repair = await Repair.findOne({
            where: {
                status: {
                    [Op.not] : "cancelled",
                },
                id
            }
        })

        if (!repair) {
            return res.status(404).json({
                status: "Not Found",
                message: "Repair could not found"
            })
        }

        if (repair.status === "completed") {
            return res.json({
                status: "deleted negative",
                message: "I dont have deleted"
            })
        }

        await repair.update({status:"cancelled"})

        return res.status(200).json({
            status: "Ok",
            repair
        })
    } catch (error) {
        return res.status(500).json({
            status: "Fail",
            message: "Repairs could not be found",
        }) 
    }
}