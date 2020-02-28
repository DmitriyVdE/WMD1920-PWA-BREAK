'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Group = mongoose.model('Group');
const Question = mongoose.model('Question');

exports.create_group = async function(req, res) {
  const temp = req.body;
  if (!await checkUserIdExists(temp.userId) || temp.groupName == null || temp.password == null ) {
    res.status(400).send({ error: 'Please make sure you add a valid \'userId\', \'groupName\' and \'password\'.'});
    return;
  }

  let newCode = makeid(6);
  while (await checkGroupCodeExists(newCode)) {
    newCode = makeid(6);
  }

  let new_group = new Group();
  new_group.groupCode = newCode;
  new_group.groupName = req.body.groupName;
  new_group.password = req.body.password;

  User.findOne({ _id: req.body.userId }, function (err, result) {
    if (err)
      res.send(err);
  }).then( function (doc) {
    new_group.owners.push(doc._id);
    new_group.users.push(doc._id);
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
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let result           = '';
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function checkUserIdExists(userId) {
  try {
    const exists = await User.exists({ _id: userId });
    return exists;
  } catch (err) {
    console.log(err);
  }
}

async function checkGroupCodeExists(code) {
  try {
    const exists = await Group.exists({ groupCode: code });
    return exists;
  } catch (err) {
    console.log(err);
  }
}
