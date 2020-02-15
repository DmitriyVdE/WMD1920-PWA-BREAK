'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('User');

  exports.create_user = function(req, res) {
    var new_user = new User(req.body);
    new_user.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
  };