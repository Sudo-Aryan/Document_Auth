const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose
  .connect("mongodb://127.0.0.1:27017/DocX")
  .then(() => {
    console.log("mongodb connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

const userSchema = mongoose.Schema({
  useraddress: {
    type: String,
  },
  username: String,
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  Role: {
    type: String,
  }
});

userSchema.plugin(plm);

module.exports = mongoose.model('users', userSchema);