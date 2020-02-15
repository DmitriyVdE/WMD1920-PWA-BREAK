'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  identifier: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  }
},{
  timestamps: true
});
  
mongoose.model('User', UserSchema );