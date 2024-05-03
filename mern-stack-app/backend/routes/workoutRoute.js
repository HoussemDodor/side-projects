const express = require("express");
const { createWorkout, getAllWorkouts, getWorkout, deleteWorkout, updateWorkout } = require("../controllers/workoutController");

const router = express.Router();

// GET all
router.get("/", getAllWorkouts);

// GET single
router.get("/:id", getWorkout);

// POST
router.post("/", createWorkout);

// DELETE
router.delete("/:id", deleteWorkout);

// PATCH
router.patch("/:id", updateWorkout);

module.exports = router;
