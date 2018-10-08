const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const config = require('../config');
const users = require('../collections/users');
const Validator = require('validatorjs');

const validationRules = require('../../src/validation/rules/signup').default;

const loginHandler = (request, reply) => {
  let {email, password} = request.payload;

  const user = users.find(u => (u.email.toLowerCase() === email.toLowerCase()
    && bcrypt.compareSync(password, u.password)));

  if (user) {
    return reply.response(responseFromUser(user)).code(200);
  } else {
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return reply.response({password: ['Password incorrect.']}).code(422);
    } else {
      return reply.response({email: ['No user with that email exists.']}).code(422);
    }
  }
};

const socialLoginHandler = async (request, reply) => {
  const {accessToken, token} = request.payload;
  let {data: user} = !accessToken
    ? await axios.get(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`)
    : await axios.get('https://www.googleapis.com/userinfo/v2/me?fields=id,email,name', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  return reply.response(responseFromUser(user)).code(200);
};

const responseFromUser = (user) => {
  const token = jwt.sign({id: user.id}, config.JWT_SECRET, {
    expiresIn: 86400
  });

  let {id, name, email} = user;

  return {
    token: {value: token, type: 'bearer', expiresIn: 86400},
    user: {id, name, email}
  };
};

const signupHandler = (request, reply) => {
  let {name, email, password} = request.payload;
  email = email.toLowerCase();

  let validator = new Validator({name, email, password}, validationRules);
  if (validator.fails()) {
    return reply.response(validator.errors.all()).code(422);
  }

  if (users.find(u => u.email === email)) {
    return reply.response({email: ['Field email must be unique']}).code(422);
  }

  const userCount = users.length;
  const lastUserId = userCount ? users[userCount - 1].id : 0;
  const user = {
    id: lastUserId + 1,
    name,
    email,
    password: bcrypt.hashSync(password, 8)
  };

  users.push(user);

  return reply.response({id: user.id, name: user.name, email: user.email}).code(200);
};

const resetPasswordHandler = (request, reply) => {
  if (!users.find(u => u.email === request.payload.email.toLowerCase())) {
    return reply.response({email: ['No user with that email exists.']}).code(422);
  }
  // send password reset email...
  return reply.response({message: 'Reset link sent'}).code(200);
};

module.exports = {
  loginHandler,
  signupHandler,
  socialLoginHandler,
  resetPasswordHandler,
};
