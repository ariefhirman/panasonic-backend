const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./src/config/db.config");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require('fs-extra');
require("dotenv").config();
// const path = "mongodb+srv://username:password@ipaddress:port/dbname?retryWrites=true&w=majority";

var corsOptions = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  preflightContinue: true,
  maxAge: 600
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");

// db.mongoose
//   .connect(path, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Successfully connect to MongoDB.");
//     initial();
//   })
//   .catch(err => {
//     console.error("Connection error", err);
//     process.exit();
//   });

db.mongoose
.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

// Multer Storage
var storage = multer.diskStorage({ 
  destination: (req, file, cb) => {
    cb(null, '../tempDir/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

var upload = multer({ 
  storage: storage
});

app.post('/testUpload', upload.single('file'), (req, res) => {
  if (err) {
      res.json({});
      return;
  }

  var dir = JSON.parse(req.body.data).directory;
  var fileName = req.file.filename;

  fs.move('../tempDir/' + fileName, '../images/' + dir + '/' + fileName, function (err) {
      if (err) {
          return console.error(err);
      }

      res.json({});
  });
  }
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Testing for User JWT API." });
});

require('./src/routes/auth.routes')(app);
require('./src/routes/detection.routes')(app);
// require('./app/routes/node.routes')(app);
// require('./app/routes/map.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//     Role.estimatedDocumentCount((err, count) => {
//       if (!err && count === 0) {
//         new Role({
//           name: "user"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'user' to roles collection");
//         });
  
//         new Role({
//           name: "moderator"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'moderator' to roles collection");
//         });
  
//         new Role({
//           name: "admin"
//         }).save(err => {
//           if (err) {
//             console.log("error", err);
//           }
  
//           console.log("added 'admin' to roles collection");
//         });
//       }
//     });
//   }