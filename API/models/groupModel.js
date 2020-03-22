'use strict';
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GroupSchema = new Schema({
  groupCode: {
    type: String
  },
  groupName: {
    type: String,
    createIndex: true
  },
  password: {
    type: String
  },
  owners: {
    type: [Schema.Types.ObjectId],
    ref:'User'
  },
  users: {
    type: [Schema.Types.ObjectId],
    ref:'User'
  },
  questions: {
    type: [Schema.Types.ObjectId],
    ref:'Question'
  }
},{
  timestamps: true
})

mongoose.model('Group', GroupSchema)