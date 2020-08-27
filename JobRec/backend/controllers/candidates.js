const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Candidate = require("../models/candidate");

exports.addNewCandidate = (req, res, next) => {
  console.log(req.body)
  const candidate = new Candidate({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    doc: null,
    jobs: []
  });
  candidate
    .save()
    .then(result => {
      res.status(201).json({
        message: "candidate created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Invalid authentication credentials!"
      });
    });
}

exports.getCandidates = (req, res, next) => {
  Candidate.find()
    .then(candidates => {
      res.status(200).json({
        message: "Candidates fetched successfully!",
        candidates: candidates
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching candidates failed!"
      });
    });
};

exports.getCandidate = (req, res, next) => {
  Candidate.findById(req.params.id)
    .then(candidate => {
      if (candidate) {
        res.status(200).json(candidate);
      } else {
        res.status(404).json({ message: "candidate not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching candidate failed!"
      });
    });
};

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

exports.getUserName = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user.firstName + ' ' + user.lastName);
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

exports.updateCandidate = (req, res, next) => {

  let d = new Date();
  let docPath = req.body.docPath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    docPath = url + "/Docs/" + req.file.filename;
  }
  const candidate = new Candidate({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    doc: docPath,
    jobs: req.body.jobs
  });
  Candidate.updateOne({ _id: req.params.id }, candidate)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate candidate!"
      });
    });
};
