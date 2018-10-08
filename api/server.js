const Hapi = require('hapi');
const config = require('./config');
const mainConfig = require('../src/config/index').default;
const users = require('./collections/users');
const AuthRoutes = require('./routes/AuthRoutes');
const NotificationRoutes = require('./routes/NotificationRoutes');
const NotificationTypeRoutes = require('./routes/NotificationTypeRoutes');
const ProfileRoutes = require('./routes/ProfileRoutes');

const validate = async (decoded, request) => {
  const user = users.find(u => u.id === decoded.id);

  return {isValid: !!user};
};

const init = async () => {
  const server = new Hapi.server({
    port: mainConfig.API_SERVER_PORT
  });

  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt', {
    key: config.JWT_SECRET,
    validate: validate,
    verifyOptions: {algorithms: ['HS256']}
  });

  server.auth.default('jwt');

  server.route([
    ...AuthRoutes,
    ...NotificationRoutes,
    ...NotificationTypeRoutes,
    ...ProfileRoutes
  ]);

  await server.start();

  return server;
};

init().then(server => {
  console.log(`API server running on port: ${mainConfig.API_SERVER_PORT}`); // eslint-disable-line
})
  .catch(error => {
    console.log(error); // eslint-disable-line
  });