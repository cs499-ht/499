const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HabitSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    dailyCompleted: { type: Boolean, required: true },
    // totalCount: { type: Double, required: true },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = Habit;
