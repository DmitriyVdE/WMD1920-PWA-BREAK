'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  identifier: {
    type: String
  },
  title: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
},{
  timestamps: true
});
  
module.exports = mongoose.model('Question', QuestionSchema);