const express = require('express')
const router = express.Router()

const {getUsers, registerUser, updateUser, deleteUser} = require('../controllers/userController')

router.post('/',registerUser)
// router.route('/').get(getUsers).post(createUser);
// router.route('/:id').patch(updateUser).delete(deleteUser);

module.exports = router