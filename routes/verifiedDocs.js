const mongoose = require('mongoose');

//varifier image hash schema 
const verifierhashschma = mongoose.Schema({
    verifierName:{
      type:String
    },
    uploadDate:{
      type:String
    },
    studentName:{
      type :String
    },
    hash:{
      type:String
    }
})

module.exports = mongoose.model('uploadhashmodel',verifierhashschma)