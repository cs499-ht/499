const router = require("express").Router(); //needed because we're creating a route
let User = require("../models/user.model"); //mongoose model

//first route 'localhost:5000/users/'
router.route("/").get((req, res) => {
  User.find() //mongoose method that gets all users from MongoDB Atlas DB; returns a promise
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//second route 'localhost:5000/users/register'
router.route("/register").post((req, res) => {
  const Username = req.body.username;

  //check if username already exists
  User.findOne({ Username: Username }).then((user) => {
    if (user) {
      return res.status(400).json("Error: Username already exists!");
    } else {
      const NewUser = new User({ Username });
      NewUser.save()
        .then(() => res.json("User registered!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

module.exports = router;
