const Doc = require("../models/doc");

exports.createDoc = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  console.log('req.body')
  console.log(req.body)
  const doc = new Doc({
    url: url + "/Docs/" + req.file.filename,
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    jobs: req.body.jobs
  });
  console.log(doc);
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

  let d = new Date();
  let docPath = req.body.doc;
  console.log('##################')
  console.log(req.params.id)
  console.log(req.file.filename)
  console.log('##################')
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    docPath = url + "/Docs/" + req.file.filename;
  }
  const doc = new Doc({
    _id: req.body.id,
    url: docPath,
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    jobs: req.body.jobs
  });
  console.log('doc')
  console.log(doc)
  console.log('doc2')
  Doc.updateOne({ _id: req.params.id }, doc)
    .then(result => {
      console.log('result')
      console.log(result)
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

