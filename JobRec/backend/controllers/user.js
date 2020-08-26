const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  // bcrypt.hash(req.body.password, 10).then(hash => {
  //   const user = new User({
  //     email: req.body.email,
  //     password: hash
  //   });
  //   user
  //     .save()
  //     .then(result => {
  //       res.status(201).json({
  //         message: "User created!",
  //         result: result
  //       });
  //     })
  //     .catch(err => {
  //       res.status(500).json({
  //         message: "Invalid authentication credentials!"
  //       });
  //     });
  // });
  let d = new Date();
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      knownAs: req.body.knownAs,
      dateOfBirth: req.body.dateOfBirth,
      city: req.body.city,
      country: req.body.country,
      created: d,
      lastActive: d,
      photoUrl: req.body.photoUrl,
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        message: "User not found!"
      });
    }
    fetchedUser = user;

    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Invalid password!"
      });
    }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "secret_this_should_be_longer",
        { expiresIn: "6h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 21600,
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}


exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: users
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching users failed!"
      });
    });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "user not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user failed!"
      });
    });
};

exports.getUserName = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user.firstName+ ' ' + user.lastName);
      } else {
        res.status(404).json({ message: "user not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching user failed!"
      });
    });
};
