'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  
},{
  timestamps: true
})
  
mongoose.model('User', UserSchema )