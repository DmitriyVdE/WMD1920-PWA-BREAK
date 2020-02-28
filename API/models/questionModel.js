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
  users: {
    type: [Schema.Types.ObjectId],
    ref:'User'
  }
},{
  timestamps: true
});
  
mongoose.model('Question', QuestionSchema);