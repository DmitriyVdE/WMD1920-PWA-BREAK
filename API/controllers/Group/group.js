'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');
const Question = mongoose.model('Question');

function checkGroupExists(code) {
  console.log('In check group exists.');
  Group.exists({ groupCode: code }).then(function(result) {
    console.log(result);
    if (result) {
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  });
}

exports.create_group = async function(req, res) {
  var temp = req;
  if (temp.body.userId == null || temp.body.groupName == null || temp.body.password == null ) {
    res.status(400).send({ error: 'Please make sure you add a \'userId\', \'groupName\' and \'password\'.'});
    return;
  }

  var new_id = 'HEX8ES';
  while (checkGroupExists(new_id)) {
    console.log(new_id);
    new_id = makeid(6);
    console.log(new_id);
  }

  var new_group = new Group();
  new_group.groupCode = new_id;
  new_group.groupName = req.body.groupName;
  new_group.password = req.body.password;

  User.findOne({ _id: req.body.userId }, function (err, result) {
    if (err)
      res.send(err);
  }).then( function (doc) {
    new_group.owners.push(doc._id);
    new_group.save(function(err, group) {
      if (err)
        res.send(err);
      res.json(group);
    });
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

exports.delete_group_users = function(req, res) {
  
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
