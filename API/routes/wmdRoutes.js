'use strict';
module.exports = function(app) {
  // mwd End Poins
  var wmdEP = require('../controllers/wmdController');

  // todoList Routes
  app.route('/users')
    .post(wmdEP.create_user);

  app.route('/groups')
    .post(wmdEP.create_group);
  
  app.route('/groups/:groupId')
    .get(wmdEP.get_group_info)
    .post(wmdEP.add_group_owner)
    .put(wmdEP.update_group_info)
    .delete(wmdEP.delete_group);

  app.route('/groups/:groupId/users')
    .get(wmdEP.get_group_users)
    .post(wmdEP.add_group_user)
    .delete(wmdEP.delete_group_user); // Array of userId's -> deletes every id in array

  app.route('/groups/:groupId/questions')
    .get(wmdEP.get_group_questions)
    .post(wmdEP.create_group_question)
    .put(wmdEP.update_group_question)
    .delete(wmdEP.delete_group_question);

  app.route('/groups/:groupId/questions/:questionId')
    .post(wmdEP.add_question_user)
    .delete(wmdEP.delete_question_user);
};