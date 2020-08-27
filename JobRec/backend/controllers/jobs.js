const Job = require("../models/job");

exports.addNewJob = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  // console.log(req.file);

  let d = new Date();
  const job = new Job({
    title: req.body.title,
    position: req.body.position,
    status: req.body.status,
    dateUpdated: d,
    manager: req.body.manager,
    team: req.body.team,
    createdBy: req.body.createdBy,
    createdAt: d,
    candidates: []
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

  let d = new Date();
  const job = new Job({
    title: req.body.title,
    position: req.body.position,
    status: req.body.status,
    dateUpdated: d,
    manager: req.body.manager,
    team: req.body.team,
    createdBy: req.body.createdBy,
    createdAt: req.body.createdAt,
    candidates: req.body.candidates
  });
  Job.updateOne({ _id: req.params.id }, job)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
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

exports.getJobs = (req, res, next) => {
  Job.find().sort({createdAt: -1})
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
  Job.findById(req.params.id)
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
  Job.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
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
