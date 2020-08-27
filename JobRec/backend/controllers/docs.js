const Doc = require("../models/doc");

exports.createDoc = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log("here    "+req)

  let d = new Date();
  const doc = new Doc({

    url: req.file != null ? url + "/Docs/" + req.file.filename : null,
    dateAdded: d,
    userId: '5f46d1d96ffcd83f3cbe6c98'
  });
  console.log(doc);
  doc
    .save()
    .then(addeddoc => {
      res.status(201).json({
        message: "Document added successfully",
        doc: {
          ...addeddoc,
          id: addeddoc._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a Document failed!"
      });
    });
};

exports.getDocs = (req, res, next) => {
  Doc.find()
    .then(docs => {
      res.status(200).json({
        message: "Documents fetched successfully!",
        docs: docs
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching documents failed!"
      });
    });
};

exports.getDoc = (req, res, next) => {
  Doc.findById(req.params.id)
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "Document not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching document failed!"
      });
    });
};

exports.deleteDoc = (req, res, next) => {
  Doc.deleteOne({ _id: req.params.id, userId: req.userData.userId })
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
        message: "Deleting document failed!"
      });
    });
};
