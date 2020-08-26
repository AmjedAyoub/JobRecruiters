const Photo = require("../models/photo");

exports.createPhoto = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  // console.log(req.file);

  let d = new Date();
  const photo = new Photo({

    url: req.file != null ? url + "/images/" + req.file.filename : null,
    dateAdded: d,
    isMain: false,
    userId: req.userData.userId
  });
  photo
    .save()
    .then(addedPhoto => {
      res.status(201).json({
        message: "Photo added successfully",
        photo: {
          ...addedPhoto,
          id: addedPhoto._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a photo failed!"
      });
    });
};

exports.getPhotos = (req, res, next) => {
  Photo.find()
    .then(photos => {
      res.status(200).json({
        message: "photos fetched successfully!",
        photos: photos
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching photos failed!"
      });
    });
};

exports.getPhoto = (req, res, next) => {
  Photo.findById(req.params.id)
    .then(photo => {
      if (photo) {
        res.status(200).json(photo);
      } else {
        res.status(404).json({ message: "Photo not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching photo failed!"
      });
    });
};

exports.deletePhoto = (req, res, next) => {
  Photo.deleteOne({ _id: req.params.id, userId: req.userData.userId })
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
        message: "Deleting photos failed!"
      });
    });
};
