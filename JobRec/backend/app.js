const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const candidateRoutes = require("./routes/candidates");
const docRoutes = require("./routes/docs");
const jobRoutes = require("./routes/jobs");

const app = express();

mongoose
  .connect(
    "mongodb+srv://amjed:fSv826sWkvpU7pQ0@cluster0.ggzbs.mongodb.net/rec-job?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/Docs", express.static(path.join("docs")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers", "application/pdf",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/candidates", candidateRoutes);
app.use("/api/docs", docRoutes);
app.use("/api/jobs", jobRoutes);

module.exports = app;
