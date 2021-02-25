const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HabitSchema = new Schema(
  {
    Username: { type: String, required: true },
    Description: { type: String, required: true },
    //DailyCompleted: { type: Boolean, required: true },
    //TotalCount: { type: Double, require: true },
  },
  {
    timestamps: true,
  }
);

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = Habit;
