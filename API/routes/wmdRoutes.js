'use strict';
// Filename: api-routes.js
// Initialize express router
var express = require('express')
let router = express.Router();

// Set default API response
router
  .get('/', function (req, res) {
    res.json({
        status: 'API Is Live',
        message: 'Welcome to the \'I want a break\' API!'
    });
  });

// mwd End Poins
var wmdUserController = require('../controllers/user/user');
var wmdGroupController = require('../controllers/group/group');
var wmdQuestionController = require('../controllers/question/question');

// wmdRoutes
router.route('/users')
  .post(wmdUserController.create_user);

router.route('/groups')
  .post(wmdGroupController.create_group);

router.route('/groups/:groupId')
  .get(wmdGroupController.get_group_info)
  .post(wmdGroupController.add_group_owner)
  .put(wmdGroupController.update_group_info)
  .delete(wmdGroupController.delete_group);

router.route('/groups/:groupId/users')
  .get(wmdGroupController.get_group_users)
  .post(wmdGroupController.add_group_user)
  .delete(wmdGroupController.delete_group_users); // Array of userId's -> deletes every id in array

router.route('/groups/:groupId/questions')
  .get(wmdQuestionController.get_group_questions)
  .post(wmdQuestionController.create_group_question)
  .put(wmdQuestionController.update_group_question)
  .delete(wmdQuestionController.delete_group_question);

router.route('/groups/:groupId/questions/:questionId')
  .post(wmdQuestionController.add_question_user)
  .delete(wmdQuestionController.delete_question_user);

// Export API routes
module.exports = router;
