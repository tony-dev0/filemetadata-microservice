var express = require("express");
var cors = require("cors");
var multer = require("multer");
require("dotenv").config();
var app = express();

var storage = multer.memoryStorage(); // Store files in memory
var upload = multer({ storage: storage });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const fileInfo = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  };
  res.json(fileInfo);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
