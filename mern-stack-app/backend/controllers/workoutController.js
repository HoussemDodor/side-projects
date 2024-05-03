const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET
const getWorkout = async (req, res) => {
  const { id } = req.params;

  // Check first if the given ID is a valid Mongoose id
  if (!mongoose.isValidObjectId(id))
    return res.status(404).json({ error: "No such workout" });

  const workout = await Workout.findById(id);

  // Check if a workout exists with the given id
  if (!workout)
    return res.status(404).json({ error: "Workout does not exist" });

  res.status(200).json(workout);
};

// GET ALL
const getAllWorkouts = async (req, res) => {
  console.log("GET all workouts")
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

// POST
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    console.log("SOmething");
    res.status(400).json({ error: error.message });
  }
};

// DELETE
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // Check first if the given ID is a valid Mongoose id
  if (!mongoose.isValidObjectId(id))
    return res.status(404).json({ error: "No such workout" });

  const workout = await Workout.findByIdAndDelete(id);

  // Check if a workout exists with the given id
  if (!workout)
    return res.status(404).json({ error: "Workout does not exist" });

  res.status(200).json(workout);
};

// PATCH
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  // Check first if the given ID is a valid Mongoose id
  if (!mongoose.isValidObjectId(id))
    return res.status(404).json({ error: "No such workout" });

  const workout = await Workout.findByIdAndUpdate(id, { ...req.body });

  // Check if a workout exists with the given id
  if (!workout)
    return res.status(404).json({ error: "Workout does not exist" });

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
};
