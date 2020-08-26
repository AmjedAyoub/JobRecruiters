const express = require("express");

const PhotoController = require("../controllers/photos");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.post("", PhotoController.createPhoto);

router.get("", PhotoController.getPhotos);

router.get("/:id", PhotoController.getPhoto);

router.delete("/:id", checkAuth, PhotoController.deletePhoto);

module.exports = router;
