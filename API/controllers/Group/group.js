'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');
const Question = mongoose.model('Question');

exports.create_group = function(req, res) {
  var new_id = makeid(6);

  while (Group.exists({ groupCode: new_id })) {
    new_id = makeid(6);
  }

  var new_group = new Group(req.body);
  console.log(new_group);
  new_group.save(function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
}

exports.get_group_info = function(req, res) {
  Group.find({ groupCode: req.params.groupCode }, function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
}

exports.add_group_owner = function(req, res) {
  
}

exports.update_group_info = function(req, res) {
  
}

exports.delete_group = function(req, res) {
  
}

exports.get_group_users = function(req, res) {
  
}

exports.add_group_user = function(req, res) {
  
}

exports.delete_group_user = function(req, res) {
  
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
