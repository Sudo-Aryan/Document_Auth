const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
  doc_Hash: {
    type: String,
  },
  issuedTo: {
    type: String,
    required: [true, "name is mendatory"],
  },
  issuedBy: {
    type: String,
  },
  issuerName: String,
  course_name: {
    type: String,
  },
  timestamp: {
    type: String,
  },
  transactionHashId: {
    type: String
  },
  filename: {
    type: String,
    required: true,
  },
  filepath: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("documents", documentSchema);
