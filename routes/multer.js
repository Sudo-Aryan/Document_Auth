const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "issued_docs/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "verified_docs/");
  },
  filename: (req, file2, cb) => {
    cb(null, Date.now() + file2.originalname);
  },
});

const upload = multer({ storage: storage });
const upload2 = multer({ storage: storage2 });

module.exports = {upload, upload2};