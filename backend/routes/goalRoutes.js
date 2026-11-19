// Use express Router
const express = require('express')
const router = express.Router()

// Bring in Controller which determine what is needed
// needed to be done at the database server side
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')

// after /api/goals/ there will be a get and post 
router.route('/').get(getGoals).post(setGoal)

// after /api/goals/ we will need a specific param 
// to update or delete that certain goal
router.route('/:id').put(updateGoal).delete(deleteGoal)

module.exports = router