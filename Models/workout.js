const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Change 'require' to 'required'
    },
    reps: {
      type: Number,
      required: true, // Change 'require' to 'required'
    },
    load: {
      type: Number,
      required: true, // Change 'require' to 'required'
    },
    user_id: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true, // Use 'timestamps' for adding createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Workout", workoutSchema);
