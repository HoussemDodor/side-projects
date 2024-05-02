const express = require('express')

const router = express.Router()

// GET all
router.get('/', (req, res) => {
    res.json( {msg: "GET all workouts"})
})

// GET single
router.get('/:id', (req, res) => {
    res.json( {msg: "GET single workout"})
})

// POST 
router.post('/', (req, res) => {
    res.json( {msg: "POST workouts"})
})

// DELETE  
router.delete('/:id', (req, res) => {
    res.json( {msg: "DELETE workout"})
})

// PATCH
router.patch('/:id', (req, res) => {
    res.json( {msg: "UPDATE workouts"})
})




module.exports = router