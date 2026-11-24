const express = require('express')
const router = express.Router()

const {getUsers, registerUser, updateUser, deleteUser, loginUser, getMe} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

module.exports = router