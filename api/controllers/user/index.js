const bcrypt = require('bcrypt');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const signUp = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(409).json({
          message: 'Email exists.',
        });
      } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({
              error
            });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash
            });
            user.save()
              .then(result => {
                res.status(201).json({
                  message: 'User created successfully',
                })
              })
              .catch(err => {
                console.log(err)
                res.status(500).json({
                  error: err,
                })
              }); 
          }
        });
      }
    });
};

const login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            id: user[0]._id
          }, 
          process.env.JWT_KEY,
          {
            expiresIn: '1h'
          });
          return res.status(200).json({
            message: 'Auth successful',
            token: token,
            users: user[0].email
          });
        }
        res.status(401).json({
          message: 'Auth failed',
        });
      })
    })
    .catch(error => {
      res.status(500).json({
        error
      })
    });
};

const remove = (req, res, next) => {
  User.remove({ id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted',
      })
    })
    .catch(error => {
      res.status(500).json({
        error
      })
    });
};

module.exports = {
  login,
  signUp,
  remove,
};
