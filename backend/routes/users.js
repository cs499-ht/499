const router = require("express").Router(); //needed because we're creating a route
let User = require("../models/user.model"); //mongoose model

// Returns all users
// https://radiant-anchorage-47017.herokuapp.com/users/
router.route("/").get((req, res) => {
  User.find() //mongoose method that gets all users from MongoDB Atlas DB; returns a promise
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Register user
// https://radiant-anchorage-47017.herokuapp.com/users/register
router.route("/register").post((req, res) => {
  const { username, password, phoneNumber, email } = req.body;

  //check if username already exists
  User.findOne({ username: username }).then((user) => {
    if (user) {
      return res.status(400).json("Error: Username already exists!");
    } else {
      const NewUser = new User({ username, password, phoneNumber, email });

      //TODO hash password

      NewUser.save()
        .then(() => res.json(`${username} registered!`))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

// login
// https://radiant-anchorage-47017.herokuapp.com/users/login
router.route("/login").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then((user) => {
    if (!user) {
      return res.status(400).json("Username not found!");
    }
    if (user.password != password) {
      return res.status(400).json("Invalid password!");
    } else {
      return res.json("Login successful!");
    }

    //TODO Authorize user
  });
});

// delete user
// https://radiant-anchorage-47017.herokuapp.com/users/delete
router.route("/delete").delete((req, res) => {
  const username = req.body.username;

  User.findOneAndDelete({ username: username }).then((user) => {
    if (!user) {
      return res.status(400).json("Username not found!");
    } else {
      return res.json(`${user.username} deleted!`);
    }
  });
});

module.exports = router;
