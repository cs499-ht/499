const router = require("express").Router(); //needed because we're creating a route
let User = require("../models/user.model"); //mongoose model

//first route 'localhost:5000/users/'
router.route("/").get((req, res) => {
  User.find() //mongoose method that gets all users from MongoDB Atlas DB; returns a promise
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

//second route 'localhost:5000/users/add'
router.route("/add").post((req, res) => {
  const Username = req.body.username;

  const NewUser = new User({ Username });

  NewUser.save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;