var mongojs = require("mongojs");
const Candidate = require("../models/candidate");
const Job = require("../models/job");

exports.createCandidate = (req, res, next) => {
  let docPath = req.body.doc;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    docPath = url + "/Docs/" + req.file.filename;
  }
  const candidate = new Candidate({
    url: docPath,
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    skills: req.body.skills,
    jobs: req.body.jobs
  });
  candidate
    .save()
    .then(addedCandidate => {
      res.status(201).json({
        message: "Candidate added successfully",
        doc: {
          ...addedCandidate,
          id: addedCandidate._id,
          url: addedCandidate.url,
          fullName: addedCandidate.fullName,
          email: addedCandidate.email,
          phone: addedCandidate.phone,
          skills: addedCandidate.skills,
          jobs: addedCandidate.jobs
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating Candidate failed!"
      });
    });
};

exports.getCandidates = (req, res, next) => {
  Candidate.find().populate("jobs").sort({_id: -1})
    .then(docs => {
      res.status(200).json({
        message: "Candidates fetched successfully!",
        docs: docs
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Candidates failed!"
      });
    });
};

exports.getCandidate = (req, res, next) => {
  Candidate.findById(req.params.id).populate("jobs")
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "Candidate not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Candidate failed!"
      });
    });
};

exports.deleteCandidate = (req, res, next) => {
  Candidate.deleteOne({ _id: mongojs.ObjectID(req.params.id) })
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting Candidate failed!"
      });
    });
};

exports.updateCandidate = (req, res, next) => {
  let docPath = req.body.doc;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    docPath = url + "/Docs/" + req.file.filename;
  }
  const candidate = new Candidate({
    _id: req.body.id,
    url: docPath,
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    skills: req.body.skills.split(','),
    jobs: req.body.jobs.split(',')
  });
  Candidate.updateOne({ _id: req.params.id }, candidate)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!", doc: candidate });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate Candidate!"
      });
    });
};

exports.updateSubsCandidates = (req, res, next) => {
  for(const reqJob of req.body){
    const job = new Job({
      _id: reqJob._id,
      title: reqJob.title,
      position: reqJob.position,
      status: reqJob.status,
      skills: reqJob.skills,
      updatedAt: reqJob.updatedAt,
      manager: reqJob.manager,
      description: reqJob.description,
      team: reqJob.team,
      createdBy: reqJob.createdBy,
      createdAt: reqJob.createdAt,
      candidates: reqJob.candidates,
    });
    Candidate.updateOne({ _id: req.params.id }, {$addToSet: { jobs: job }})
      .then(result => {
        if (result.n > 0) {
          // res.status(200).json({ message: "Updated submissions successfully!", doc: job });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          message: "Couldn't udpate submissions!"
        });
      });
    }
  };

exports.deleteSubs = (req, res, next) => {
  Candidate.updateMany({}, { $pull: { jobs: req.params.id} } )
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting jobs failed!"
      });
    });
};

