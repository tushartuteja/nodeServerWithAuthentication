const jwtSimple = require('jwt-simple');
const config = require('./../config');
const User = require('./../models/user');

function tokenForUser(user) {
  const timeStamp = new Date().getTime();
  return jwtSimple.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

function signup(req, res, next) {
  const { email, password } = req.body;
  const query = { email };
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email or user' });
  }
  User.findOne(query, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: 'Email already exisits' });
    }

    const user = new User({
      email,
      password,
    });

    user.save((saveError) => {
      if (saveError) {
        return next(saveError);
      }
      return res.json({ token: tokenForUser(user) });
    });
  });
}

function signin(req, res) {
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = signup;
exports.signin = signin;
