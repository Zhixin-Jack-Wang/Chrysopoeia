const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const app = express();

// Passport config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").MongoURI;

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//JSON
app.use(express.json());

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

// Multer

// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./public/upload/",
  filename: function(req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).single("myImage");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only!");
  }
}

// Public Folder
app.use(express.static("./public"));

app.post("/upload", (req, res) => {
  console.log("posting");
  upload(req, res, err => {
    if (err) {
      res.json("not working");
    } else {
      if (req.file == undefined) {
        res.json("no file selected");
      } else {
        res.json({
          msg: "File uploaded!",
          file: `/upload/${req.file.filename}`
        });
      }
    }
  });
});

//heroku build
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
