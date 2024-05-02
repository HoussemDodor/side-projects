const express = require("express");
const Workout = require("../models/workoutModel");

const router = express.Router();

// GET all
router.get("/", (req, res) => {
  res.json({ msg: "GET all workouts" });
});

// GET single
router.get("/:id", (req, res) => {
  res.json({ msg: "GET single workout" });
});

// POST
router.post("/", async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    console.log("SOmething")
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  res.json({ msg: "DELETE workout" });
});

// PATCH
router.patch("/:id", (req, res) => {
  res.json({ msg: "UPDATE workouts" });
});

module.exports = router;
