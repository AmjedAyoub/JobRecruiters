const express = require("express");

const CandidateController = require("../controllers/candidates");

const router = express.Router();

router.post("/addnewcan", CandidateController.addNewCandidate);

router.get("", CandidateController.getCandidates);

router.get("/:id", CandidateController.getCandidate);

router.put("/:id", CandidateController.updateCandidate);

// router.post("/login", CandidateController.userLogin);

module.exports = router;
