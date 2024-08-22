const express = require("express");
// const Workout = require("../Models/workout");
const {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../Middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

//Get all workouts
router.get("/", getAllWorkouts);

//get single workouts
router.get("/:id", getWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a new workout
router.delete("/:id", deleteWorkout);

// UPDATE a new workout
router.patch("/:id", updateWorkout);

module.exports = router;
