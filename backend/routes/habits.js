const router = require("express").Router(); //needed because we're creating a route
const Habit = require("../models/habit.model");
let User = require("../models/habit.model"); //mongoose model

//first route 'localhost:5000/habits/'
router.route("/").get((req, res) => {
  User.find() //mongoose method that gets all habits from MongoDB Atlas DB; returns a promise
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//second route 'localhost:5000/habits/add'
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const dailyCompleted = req.body.dailyCompleted;
  //const TotalCount = req.Body.TotalCount;

  const newHabit = new Habit({ username, description, dailyCompleted });

  newHabit.save()
    .then(() => res.json("Habit added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// '/:id' - MongoDB ID
router.route('/:id').get((req, res) => {
    Habit.findById(req.params.id)
    .then(habit => res.json(habit))
    .catch(err => res.status(400).json('Error: ' + err));
});

// delete habit
router.route('/:id').delete((req, res) => {
    Habit.findByIdAndDelete(req.params.id)
    .then(habit => res.json('Habit deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update habit
router.route('/update/:id').post((req, res) => {
    Habit.findById(req.params.id)
    .then(habit => {
        habit.username = req.body.username;
        habit.Description = req.body.Description;
        // habit.DailyCompleted = req.body.DailyCompleted;
        // habit.TotalCount = req.body.TotalCount;

        habit.save()
        .then(()=> res.json('Habit updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
