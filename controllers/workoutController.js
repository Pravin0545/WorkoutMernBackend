const Workout = require("../Models/workout");
const mongoose = require("mongoose");

//get all workout

const getAllWorkouts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get a single workout

const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout found" });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//create a new workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (!title || !load || !reps) {
    return res.status(400).json({ error: `Please provide ${emptyFields}` });
  }
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout found" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No such workout found" });
  }
  res.status(200).json(workout);
};
// update s workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout found" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout found" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
