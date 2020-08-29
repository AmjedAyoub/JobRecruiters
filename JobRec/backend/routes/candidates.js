const express = require("express");

const CandidateController = require("../controllers/candidates");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", extractFile, CandidateController.addNewCandidate);

router.get("", CandidateController.getCandidates);

router.get("/:id", CandidateController.getCandidate);

router.put("/:id", CandidateController.updateCandidate);

// router.post("/login", CandidateController.userLogin);

module.exports = router;
