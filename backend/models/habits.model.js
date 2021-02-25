const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HabitsSchema = new Schema(
  {
    Username: { type: String, required: true },
    Description: { type: String, required: true },
    DailyCompleted: { type: Boolean, required: true },
    TotalCount: { type: Double, require: true },
  },
  {
    timestamps: true,
  }
);

const Habits = mongoose.model("Habits", HabitsSchema);

module.exports = Habits;
