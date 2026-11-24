const asyncHandler = require('express-async-handler')

const Users = require('../models/userModel')

// @desc Get users
// @route  GET /api/users/me
// @access Public
const getUsers = asyncHandler(async (req, res) => {
    const users = await Users.find()

    res.status(200).json(users)
})

// @desc create user
// @route  POST /api/users/:id
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
    if(!req?.body?.name){
        res.status(400)
        throw new Error('No name inputed')
    }

    const user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    res.status(200).json(user)
})

// @desc update user
// @route  Patch /api/users/:id
// @access Private 
const updateUser = asyncHandler(async (req, res) => {
    if(!req?.params?.id){
        res.status(400)
        throw new Error('No user inputed to update')
    }

    const user = await Users.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    },
    {
        new: true
    })

    res.status(200).json(user)
})

const loginUser = (req, res) => {
    res.json({ message: 'Login User'})
}

// @desc delete user
// @route  DELETE /api/users/:id
// @access Private 
const deleteUser = asyncHandler(async (req, res) => {
    if(!req?.params?.id){
        res.status(400)
        throw new Error('No user inputed to delete')
    }

    const user = await Users.findByIdAndDelete(req.params.id)

    res.status(200).json(user)
})

module.exports = {getUsers, registerUser, updateUser, deleteUser}