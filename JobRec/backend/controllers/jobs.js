var mongojs = require("mongojs");
const Candidate = require("../models/candidate");
const Job = require("../models/job");

exports.addNewJob = (req, res, next) => {
  const job = new Job({
    title: req.body.title,
    position: req.body.position,
    status: req.body.status,
    skills: req.body.skills,
    updatedAt: req.body.updatedAt,
    manager: req.body.manager,
    description: req.body.description,
    team: req.body.team,
    createdBy: req.body.createdBy,
    createdAt: req.body.createdAt,
    candidates: req.body.candidates,
  });
  job
    .save()
    .then(createdjob => {
      res.status(201).json({
        message: "Job added successfully",
        job: {
          ...createdjob,
          id: createdjob._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a job failed!"
      });
    });
};

exports.updateJob = (req, res, next) => {
  let d = new Date().toLocaleDateString('en-US').toString();
  const job = new Job({
    _id: req.params.id,
    title: req.body.title,
    position: req.body.position,
    status: req.body.status,
    updatedAt: d,
    manager: req.body.manager,
    team: req.body.team,
    skills: req.body.skills,
    candidates: req.body.candidates,
    createdBy: req.body.createdBy,
    createdAt: req.body.createdAt,
    description: req.body.description
  });
  Job.updateOne({ _id: req.params.id }, job)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!", job: job });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate job!"
      });
    });
};

exports.updateSubsJob = (req, res, next) => {
  for(const reqCan of req.body){
    const candidate = new Candidate({
      _id: reqCan._id,
      url: reqCan.resume,
      fullName: reqCan.fullName,
      email: reqCan.email,
      phone: reqCan.phone,
      skills: reqCan.skills,
      jobs: reqCan.jobs
    });
    Job.updateOne({ _id: req.params.id }, {$addToSet: { candidates: candidate }})
      .then(result => {
        if (result.n > 0) {
          // res.status(200).json({ message: "Updated submissions successfully!", job: candidate });
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

exports.getJobs = (req, res, next) => {
  Job.find().populate("candidates").sort({createdAt: -1})
    .then(jobs => {
      res.status(200).json({
        message: "jobs fetched successfully!",
        jobs: jobs
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching jobs failed!"
      });
    });
};

exports.getJob = (req, res, next) => {
  Job.findById(req.params.id).populate("candidates")
    .then(job => {
      if (job) {
        res.status(200).json(job);
      } else {
        res.status(404).json({ message: "Job not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching job failed!"
      });
    });
};

exports.deleteJob = (req, res, next) => {
  Job.deleteOne({ _id: mongojs.ObjectID(req.params.id) })
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

exports.deleteSubs = (req, res, next) => {
  Job.updateMany({}, { $pull: { candidates: req.params.id} } )
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
