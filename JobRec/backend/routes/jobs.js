const express = require("express");

const JobController = require("../controllers/jobs");

// const checkAuth = require("../middleware/check-auth");
// const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", JobController.addNewJob);

router.put("/:id", JobController.updateJob);

router.get("", JobController.getJobs);

router.get("/:id", JobController.getJob);

router.delete("/:id", JobController.deleteJob);

module.exports = router;
