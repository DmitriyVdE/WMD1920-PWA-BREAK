"use strict";
// Filename: api-routes.js
// Initialize express router
var express = require("express");
let router = express.Router();

function setupRouter(getIOInstance) {
  // Set default API response
  router.get("/", function (req, res) {
    res.json({
      status: "API is Live!",
      message: "Welcome to the 'I want a break' API!",
    });
  });

  // mwd End Poins
  var wmdUserController = require("../controllers/user/user");
  wmdUserController.setupController(getIOInstance);

  var wmdGroupController = require("../controllers/group/group");
  wmdGroupController.setupController(getIOInstance);

  var wmdQuestionController = require("../controllers/question/question");
  wmdQuestionController.setupController(getIOInstance);

  // wmdRoutes
  router.route("/users").post(wmdUserController.create_user);

  router.route("/groups").post(wmdGroupController.create_group);

  router
    .route("/groups/:groupId")
    .post(wmdGroupController.add_group_owner)
    .put(wmdGroupController.update_group_info)
    .delete(wmdGroupController.delete_group);

  router
    .route("/groups/:groupId/:userId")
    .get(wmdGroupController.get_group_info);

  router
    .route("/groups/:groupId/users")
    .delete(wmdGroupController.delete_group_users); // Array of userId's -> deletes every id in array

  router
    .route("/groups/:groupId/questions")
    .post(wmdQuestionController.create_group_question)
    .put(wmdQuestionController.update_group_question)
    .delete(wmdQuestionController.delete_group_question);

  router
    .route("/groups/:groupId/questions/:userId")
    .get(wmdQuestionController.get_group_questions);

  router
    .route("/groups/:groupId/questions/:questionId")
    .post(wmdQuestionController.add_question_user)
    .delete(wmdQuestionController.delete_question_user);

  return router;
}

// Export API routes
module.exports = setupRouter;
