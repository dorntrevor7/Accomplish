// Use express Router
const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

// Bring in Controller which determine what is needed
// needed to be done at the database server side
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

// after /api/goals/ there will be a get and post 
router.route('/').get(protect, getGoals).post(protect, setGoal)

// after /api/goals/ we will need a specific param 
// to update or delete that certain goal
router.route('/:id').patch(protect, updateGoal).delete(protect, deleteGoal)

module.exports = router