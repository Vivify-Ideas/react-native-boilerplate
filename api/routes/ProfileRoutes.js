const ProfileController = require('../controllers/ProfileController');

const profileRoutes = [
  {
    method: 'PUT',
    path: '/api/profile/me',
    config: {auth: 'jwt'},
    handler: ProfileController.updateHandler
  },
  {
    method: 'PUT',
    path: '/api/profile/me/password',
    config: {auth: 'jwt'},
    handler: ProfileController.passwordUpdateHandler
  }
];

module.exports = profileRoutes;