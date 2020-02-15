'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');
const Question = mongoose.model('Question');

exports.get_group_info = function(req, res) {
  Group.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.create_group = function(req, res) {
  var new_group = new Group(req.body);
  new_group.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};