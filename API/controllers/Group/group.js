'use strict';
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Group = mongoose.model('Group')
const Question = mongoose.model('Question')

exports.create_group = async function(req, res) {
  const temp = req.body
  if (!await checkUserIdExists(temp.userId) || temp.groupName == "" || temp.password == "" ) {
    res.status(400).send({ error: 'Please make sure you add a valid \'userId\', \'groupName\' and \'password\'.'})
    return
  }

  let newCode = makeid(6)
  while (await checkGroupCodeExists(newCode)) {
    newCode = makeid(6)
  }

  let new_group = new Group()
  new_group.groupCode = newCode
  new_group.groupName = req.body.groupName
  new_group.password = req.body.password

  User.findOne({ _id: req.body.userId }, function (err, result) {
    if (err)
      res.send(err)
  }).then( function (doc) {
    new_group.owners.push(doc._id)
    new_group.users.push(doc._id)
    new_group.save(function(err, group) {
      if (err)
        res.send(err)
      res.json({groupCode: group.groupCode, groupName: group.groupName })
    })
  })
}

// Add toUpper to groupCode input.
exports.get_group_info = async function(req, res) {
  if (await checkGroupCodeExists(req.params.groupId)) {
    Group.findOne({ groupCode: req.params.groupId }, async function(err, group) {
      if (err)
        res.send(err)

      if (!isUserInGroup(req.params.userId, group.users)) {
        group.users.push(req.params.userId)
        group.save()
      }
      const isOwner = group.owners.includes(req.params.userId)

      let questions = await Question.find({ '_id': { $in: group.questions } })

      let filtered = []
      questions.forEach(question => {
        filtered.push({ 'questionId': question._id, 'title': question.title, 'votes': question.users.length })
      })

      res.json({ groupName: group.groupName, isOwner: isOwner, userCount: group.users.length, questions: filtered })
    })
  } else {
    res.status(400).send({ error: 'Please make sure you are trying to join an existing group.'})
    return
  }
}

exports.add_group_owner = async function(req, res) {
  if (req.params.groupId === req.body.groupCode && await checkGroupCodeExists(req.body.groupCode) && await groupPasswordIsCorrect(req.body.groupCode, req.body.password)) {
    Group.findOne({ groupCode: req.body.groupCode }, function(err, group) {
      if (err)
        res.send(err)

      if (!userIsOwner(req.body.userId, group.owners)) {
        group.owners.push(req.body.userId)
        group.save()
      }
      const isOwner = group.owners.includes(req.body.userId)
      res.json({groupName: group.groupName, 'userId': req.body.userId, isOwner: isOwner})
    })
  } else {
    res.status(400).send({ error: 'Group does not exist or incorrect password.'})
    return
  }
}

exports.update_group_info = async function(req, res) {
  if (req.params.groupId === req.body.groupCode && await checkGroupCodeExists(req.body.groupCode) && req.body.groupName != "") {
    Group.findOne({ groupCode: req.body.groupCode }, function(err, group) {
      if (err)
        res.send(err)
      let oldGroupName = group.groupName

      if (userIsOwner(req.body.userId, group.owners)) {
        group.groupName = req.body.groupName
        group.save()
      }

      res.json({oldGroupName: oldGroupName, newGroupName: group.groupName})
    })
  } else {
    res.status(400).send({ error: 'Group does not exist.'})
    return
  }
}

exports.delete_group = async function(req, res) {
  if (req.params.groupId === req.body.groupCode && await checkGroupCodeExists(req.body.groupCode) && await groupPasswordIsCorrect(req.body.groupCode, req.body.password)) {
    Group.findOne({ groupCode: req.body.groupCode }, function(err, group) {
      if (err)
        res.send(err)

      let groupName = group.groupName
      group.remove()

      res.json({message: 'The group ' + groupName + ' has been deleted.'})
    })
  } else {
    res.status(400).send({ error: 'Group does not exist or password is incorrect.'})
    return
  }
}

exports.delete_group_users = async function(req, res) {
  if (req.params.groupId === req.body.groupCode && await checkGroupCodeExists(req.body.groupCode) && await groupPasswordIsCorrect(req.body.groupCode, req.body.password)) {
    Group.findOne({ groupCode: req.body.groupCode }, function(err, group) {
      if (err)
        res.send(err)

      group.users = group.owners
      group.save()

      res.json({message: 'All non-owners have been kicked from the group.'})
    })
  } else {
    res.status(400).send({ error: 'Group does not exist or password is incorrect.'})
    return
  }
}

function makeid(length) {
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const charactersLength = characters.length
  let result           = ''
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

async function checkUserIdExists(userId) {
  try {
    const exists = await User.exists({ _id: userId })
    return exists
  } catch (err) {
    console.log(err)
    return false
  }
}

async function checkGroupCodeExists(code) {
  try {
    const exists = await Group.exists({ groupCode: code })
    return exists
  } catch (err) {
    console.log(err)
    return false
  }
}

function isUserInGroup(userId, memberList) {
  try {
    const inGroup = memberList.includes(userId)
    return inGroup
  } catch (err) {
    console.log(err)
    return false
  }
}

function userIsOwner(userId, ownerList) {
  try {
    const inGroup = ownerList.includes(userId)
    return inGroup
  } catch (err) {
    console.log(err)
    return false
  }
}

async function groupPasswordIsCorrect(code, password) {
  try {
    let correct = false
    await Group.findOne({ groupCode: code }, function(err, group) {
      if (group.password == password) {
        correct = true
      } else {
        correct = false
      }
    })
    return correct
  } catch (err) {
    console.log(err)
    return false
  }
}
