const AuthController = require('../controllers/AuthController');

const authRoutes = [
  {
    method: 'POST',
    path: '/api/login',
    config: {auth: false},
    handler: AuthController.loginHandler
  },
  {
    method: 'POST',
    path: '/api/logout',
    config: {auth: false},
    handler: (request, h) => {
      return h.response({});
    }
  },
  {
    method: 'POST',
    path: '/api/sign-up',
    config: {auth: false},
    handler: AuthController.signupHandler
  },
  {
    method: 'POST',
    path: '/api/login-social',
    config: {auth: false},
    handler: AuthController.socialLoginHandler
  },
  {
    method: 'POST',
    path: '/api/reset-password',
    config: {auth: false},
    handler: AuthController.resetPasswordHandler
  },
];

module.exports = authRoutes;
