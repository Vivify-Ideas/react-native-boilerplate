const Validator = require('validatorjs');
const bcrypt = require('bcryptjs');
const validationRules = require('../../src/validation/rules/profile').default;
let users = require('../collections/users');

const updateHandler = (request, reply) => {
  let {name, email, oldPassword, newPassword} = request.payload;

  let validator = new Validator(
    {name, email, oldPassword, newPassword},
    validationRules.updateProfile
  );

  if (validator.fails()) {
    return reply.response(validator.errors.all()).code(422);
  }

  const user = users.find(u => u.id === request.auth.credentials.id);
  Object.assign(user, {name, email});

  return reply.response(user).code(200);
};

const passwordUpdateHandler = (request, reply) => {
  let {oldPassword, newPassword} = request.payload;

  let validator = new Validator(
    {oldPassword, newPassword},
    validationRules.updatePassword
  );

  if (validator.fails()) {
    return reply.response(validator.errors.all()).code(422);
  }

  const user = users.find(u => u.id === request.auth.credentials.id);
  Object.assign(user, {password: bcrypt.hashSync(newPassword, 8)});

  return reply.response(user).code(200);
};

module.exports = {
  updateHandler,
  passwordUpdateHandler
};