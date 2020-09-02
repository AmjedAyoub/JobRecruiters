const Doc = require("../models/doc");

exports.createDoc = (req, res, next) => {
  let docPath = req.body.doc;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    docPath = url + "/Docs/" + req.file.filename;
  }
  const doc = new Doc({
    url: docPath,
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    skills: req.body.skills,
    jobs: req.body.jobs
  });
  doc
    .save()
    .then(addeddoc => {
      res.status(201).json({
        message: "Document added successfully",
        doc: {
          ...addeddoc,
          id: addeddoc._id,
          url: addeddoc.url,
          fullName: addeddoc.fullName,
          email: addeddoc.email,
          phone: addeddoc.phone,
          skills: addeddoc.skills,
          jobs: addeddoc.jobs
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
  Doc.find().sort({_id: -1})
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
  Doc.deleteOne({ _id: req.params.id })
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

exports.updateDoc = (req, res, next) => {
  let docPath = req.body.doc;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    docPath = url + "/Docs/" + req.file.filename;
  }
  console.log(req.body);
  const doc = new Doc({
    _id: req.body.id,
    url: docPath,
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    skills: req.body.skills.split(','),
    jobs: req.body.jobs.split(',')
  });
  Doc.updateOne({ _id: req.params.id }, doc)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!", doc: doc });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate resume!"
      });
    });
};

