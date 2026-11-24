const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
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
    const { name, email, password } = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await Users.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    //  Hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User 
    const user = await Users.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error({ message: 'Invalid User Data'})
    }

    // if(!req?.body?.name){
    //     res.status(400)
    //     throw new Error('No name inputed')
    // }

    // const user = await Users.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // })

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

const getMe = (req, res) => {
    res.json({message: 'Got User'})
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

module.exports = {getUsers, registerUser, updateUser, deleteUser, loginUser, getMe}