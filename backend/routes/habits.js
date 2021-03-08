const router = require("express").Router(); //needed because we're creating a route
const Habit = require("../models/habit.model");

//first route 'localhost:5000/habits/'
router.route("/").get((req, res) => {
  Habit.find() //mongoose method that gets all habits from MongoDB Atlas DB; returns a promise
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//second route 'localhost:5000/habits/add'
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const dailyCompleted = req.body.dailyCompleted;
  //const TotalCount = req.Body.TotalCount;

  // check if duplicate habit
  Habit.findOne({ username: username, description: description }).then(
    (habit) => {
      if (habit) {
        return res.status(400).json("Error: User already has this habit!");
      } else {
        const newHabit = new Habit({ username, description, dailyCompleted });
        newHabit
          .save()
          // .then(() => res.json(`${username}'s ${description} habit added!`))
          // convert mongoose document into JSON
          .then(() => res.end(JSON.stringify(newHabit)))
          .catch((err) => res.status(400).json("Error: " + err));
      }
    }
  );
});

// '/:id' - MongoDB ID
router.route("/:id").get((req, res) => {
  Habit.findById(req.params.id)
    .then((habit) => res.json(habit))
    .catch((err) => res.status(400).json("Error: " + err));
});

// delete habit
router.route("/:id").delete((req, res) => {
  Habit.findByIdAndDelete(req.params.id)
    .then((habit) =>
      res.json(`${habit.username}: ${habit.description} deleted!`)
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

//update habit
router.route("/update/:id").post((req, res) => {
  Habit.findById(req.params.id)
    .then((habit) => {
      habit.username = req.body.username;
      habit.Description = req.body.Description;
      habit.dailyCompleted = req.body.dailyCompleted;
      // habit.TotalCount = req.body.TotalCount;

      habit
        .save()
        // .then(() => res.json("Habit updated!"))
        // convert mongoose document into JSON
        .then(() => res.end(JSON.stringify(habit)))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
