'use strict';
let jwtAuth = require('../lib/auth.js');
module.exports = (userRouter, models) => {
  let User = models.User;

  userRouter.route('/members')
    .get(jwtAuth, (req, res) => {
      User.find({}, (err, users) => {
        if(err) throw err;
        res.json({
          data: users
        });
      });
    })
    .post(jwtAuth, (req, res) => {
      User.findOne({telephone: req.body.telephone}, (err, user) => {
        if(err) throw err;
        console.log(user);
        if(!user) {
          var newUser = new User(req.body);
          newUser.save((err, user) => {
            res.json({
              data: user
            });
          });
        }else {
          res.status(401).json({error: 'Number exsit!'});
        }
      });
    });

  userRouter.route('/members/:id')
    .get(jwtAuth, (req, res) => {
      User.findById(req.params.id, (err, user) => {
        if(err) throw err;
        res.json({
          data: user
        });
      });
    })
    .put(jwtAuth, (req, res) => {
      User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if(err) throw err;
        res.json({
          data: user,
          msg: 'User updated!'
        });
      });
    })
    .delete(jwtAuth, (req, res) => {
      console.log(req);
      User.findById(req.params.id, (err, user) => {
        if(err) throw err;
        user.remove((err) => {
          if(err) throw err;
          res.json({
            data: 'User removed!'
          });
        });
      });
    });
}
