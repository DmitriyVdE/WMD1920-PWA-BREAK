"use strict";
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");
const Question = mongoose.model("Question");
var io;

exports.setupController = function (getIOInstance) {
  io = getIOInstance();
};

exports.get_group_questions = async function (req, res) {
  if (
    (await checkGroupCodeExists(req.params.groupId)) &&
    (await checkUserIdExists(req.params.userId))
  ) {
    Group.findOne({ groupCode: req.params.groupId }, async function (
      err,
      group
    ) {
      if (err) res.send(err);

      let questions = await Question.find({ _id: { $in: group.questions } });

      let filtered = [];
      questions.forEach((question) => {
        let voted = question.users.includes(req.params.userId);
        filtered.push({
          questionId: question._id,
          title: question.title,
          votes: question.users.length,
          voted: voted,
        });
      });

      res.json({ groupName: group.groupName, questions: filtered });
    });
  } else {
    res.status(400).send({ error: "Invalid request or group does not exist." });
    return;
  }
};

exports.create_group_question = async function (req, res) {
  if (
    req.params.groupId === req.body.groupCode &&
    (await checkGroupCodeExists(req.body.groupCode)) &&
    (await checkUserIdExists(req.body.userId)) &&
    req.body.question != ""
  ) {
    Group.findOne({ groupCode: req.body.groupCode }, async function (
      err,
      group
    ) {
      if (err) res.send(err);

      if (userIsOwner(req.body.userId, group.owners)) {
        let question = new Question();
        question.title = req.body.question;
        await question.save();

        group.questions.push(question);
        await group.save();
      }

      let questions = await Question.find({ _id: { $in: group.questions } });

      let filtered = [];
      questions.forEach((question) => {
        let voted = question.users.includes(req.body.userId);
        filtered.push({
          questionId: question._id,
          title: question.title,
          votes: question.users.length,
          voted: voted,
        });
      });

      io.to(req.params.groupId).emit("qnew", "New question has been added");
      res.json({ groupName: group.groupName, questions: filtered });
    });
  } else {
    res.status(400).send({ error: "Invalid request or group does not exist." });
    return;
  }
};

exports.update_group_question = async function (req, res) {
  if (
    req.params.groupId === req.body.groupCode &&
    (await checkGroupCodeExists(req.body.groupCode)) &&
    (await checkUserIdExists(req.body.userId)) &&
    req.body.questionId != "" &&
    req.body.question != ""
  ) {
    Group.findOne({ groupCode: req.body.groupCode }, async function (
      err,
      group
    ) {
      if (err) res.send(err);

      if (userIsOwner(req.body.userId, group.owners)) {
        let question = await Question.findById(req.body.questionId);
        question.title = req.body.question;
        await question.save();
      }

      let questions = await Question.find({ _id: { $in: group.questions } });

      let filtered = [];
      questions.forEach((question) => {
        let voted = question.users.includes(req.body.userId);
        filtered.push({
          questionId: question._id,
          title: question.title,
          votes: question.users.length,
          voted: voted,
        });
      });

      io.to(req.params.groupId).emit("qupd", "A question has been edited");
      res.json({ groupName: group.groupName, questions: filtered });
    });
  } else {
    res.status(400).send({ error: "Invalid request or group does not exist." });
    return;
  }
};

exports.delete_group_question = async function (req, res) {
  if (
    req.params.groupId === req.body.groupCode &&
    (await checkGroupCodeExists(req.body.groupCode)) &&
    (await checkUserIdExists(req.body.userId)) &&
    req.body.questionId != ""
  ) {
    Group.findOne({ groupCode: req.body.groupCode }, async function (
      err,
      group
    ) {
      if (err) res.send(err);

      if (userIsOwner(req.body.userId, group.owners)) {
        let question = await Question.findById(req.body.questionId);
        if (question) await question.remove();

        for (var i = 0; i < group.questions.length; i++) {
          if (group.questions[i] == req.body.questionId) {
            group.questions.splice(i, 1);
          }
        }
        group.save();
      }

      let questions = await Question.find({ _id: { $in: group.questions } });

      let filtered = [];
      questions.forEach((question) => {
        let voted = question.users.includes(req.body.userId);
        filtered.push({
          questionId: question._id,
          title: question.title,
          votes: question.users.length,
          voted: voted,
        });
      });

      io.to(req.params.groupId).emit("delq", "A question has been deleted");
      res.json({ groupName: group.groupName, questions: filtered });
    });
  } else {
    res.status(400).send({ error: "Invalid request or group does not exist." });
    return;
  }
};

exports.add_question_user = async function (req, res) {
  if (
    req.params.groupId === req.body.groupCode &&
    req.params.questionId === req.body.questionId &&
    (await checkGroupCodeExists(req.body.groupCode)) &&
    (await checkUserIdExists(req.body.userId)) &&
    req.params.questionId != ""
  ) {
    Question.findById(req.params.questionId, async function (err, question) {
      if (err) res.send(err);

      const user = await User.findById(req.body.userId);
      if (!question.users.includes(user._id)) {
        question.users.push(user);
        question.save();
      }

      let voted = question.users.includes(req.body.userId);
      io.to(req.params.groupId).emit("vote", "Someone has voted on a question");
      res.json({
        questionId: req.params.questionId,
        title: question.title,
        votes: question.users.length,
        voted: voted,
      });
    });
  } else {
    res.status(400).send({ error: "Invalid request or group does not exist." });
    return;
  }
};

exports.delete_question_user = async function (req, res) {
  if (
    req.params.groupId === req.body.groupCode &&
    req.params.questionId === req.body.questionId &&
    (await checkGroupCodeExists(req.body.groupCode)) &&
    (await checkUserIdExists(req.body.userId)) &&
    req.params.questionId != ""
  ) {
    Question.findById(req.params.questionId, async function (err, question) {
      if (err) res.send(err);

      const user = await User.findById(req.body.userId);
      if (question.users.includes(user._id)) {
        for (var i = 0; i < question.users.length; i++) {
          if (question.users[i]._id.toString() == user._id.toString()) {
            question.users.splice(i, 1);
          }
        }
        question.save();
      }

      let voted = question.users.includes(req.body.userId);
      io.to(req.params.groupId).emit(
        "unvote",
        "Someone has removed their vote on a question"
      );
      res.json({
        questionId: req.params.questionId,
        title: question.title,
        votes: question.users.length,
        voted: voted,
      });
    });
  } else {
    res.status(400).send({ error: "Invalid request or group does not exist." });
    return;
  }
};

async function checkUserIdExists(userId) {
  try {
    const exists = await User.exists({ _id: userId });
    return exists;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function checkGroupCodeExists(code) {
  try {
    const exists = await Group.exists({ groupCode: code });
    return exists;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function isUserInGroup(userId, memberList) {
  try {
    const inGroup = memberList.includes(userId);
    return inGroup;
  } catch (err) {
    console.log(err);
    return false;
  }
}

function userIsOwner(userId, ownerList) {
  try {
    const inGroup = ownerList.includes(userId);
    return inGroup;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function groupPasswordIsCorrect(code, password) {
  try {
    let correct = false;
    await Group.findOne({ groupCode: code }, function (err, group) {
      if (group.password == password) {
        correct = true;
      } else {
        correct = false;
      }
    });
    return correct;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getQuestionById(questionId) {
  try {
    const question = await Question.findById(questionId);
    return question;
  } catch (err) {
    console.log(err);
    return false;
  }
}
