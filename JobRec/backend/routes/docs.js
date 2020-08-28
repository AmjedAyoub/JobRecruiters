const express = require("express");

const DocController = require("../controllers/docs");

// const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", extractFile, DocController.createDoc);

router.get("", DocController.getDocs);

router.get("/:id", DocController.getDoc);

router.delete("/:id", DocController.deleteDoc);

module.exports = router;
