const express = require("express");

const CandidateController = require("../controllers/candidates");

// const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", extractFile, CandidateController.createCandidate);

router.get("", CandidateController.getCandidates);

router.get("/:id", CandidateController.getCandidate);

router.delete("/:id", CandidateController.deleteCandidate);

router.put("/:id", extractFile, CandidateController.updateCandidate);

module.exports = router;
