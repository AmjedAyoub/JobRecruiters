const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const candidateRoutes = require("./routes/candidates");
const jobRoutes = require("./routes/jobs");
var cors = require('cors')


const app = express();
// 5afFn6jmKxPzq56
// BQ7ZwR8CePYyf2Hl
mongoose
.connect(
  "mongodb+srv://amjed2:5afFn6jmKxPzq56@cluster0.ggzbs.mongodb.net/rec-job?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("Connection failed!");
    console.log(err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/Docs", express.static(path.join(__dirname, "Docs")));
app.use("/", express.static(path.join(__dirname, "angular")));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Access-Control-Allow-Headers, Content-Type, content-type, Accept, Authorization, application/pdf, application/json,charset=utf-8, application/x-www-form-urlencoded, multipart/form-data, text/plain, */*"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });

app.use("/api/candidates", candidateRoutes);
app.use("/api/jobs", jobRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});

module.exports = app;
