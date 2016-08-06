'use strict';
var accountSid = process.env.ACCOUNT_SID;
var auth_token = process.env.AUTH_TOKEN;
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, auth_token);
let jwtAuth = require('../lib/auth.js');

module.exports = (smsRouter, models) => {
  let User = models.User;
  let Message = models.Message;
  smsRouter.post('/sms', jwtAuth, (req, res) => {
    User.find({}, (err, users) => {
      if(err) throw err;
      users.forEach((user) => {
        client.messages.create({
          body: req.body.text,
          to: '+1'+user.telephone,
          from: process.env.TWILIO_NUMBER
        }, function(err, message) {
          if(err) console.log(err.message);
          console.log(message.sid);
        });
      });
      res.json({
        data: req.body.text
      });
    });
    console.log(req.body.text);

  });

  smsRouter.get('/sms/message', (req, res) => {
    Message.findById('57a5305ab05f91be06971f3c', (err, msg) => {
      if(err) throw err;
      res.json({
        data: msg
      });
    });
  });

  smsRouter.post('/sms/message', jwtAuth, (req, res) => {
    var newMessage = new Message(req.body);
    newMessage.save((err, msg) => {
      if(err) throw err;
      res.json({
        data: msg
      });
    });
  });

  smsRouter.put('/sms/message', jwtAuth, (req, res) => {
    console.log(req.body);
    Message.findByIdAndUpdate('57a5305ab05f91be06971f3c', req.body, (err, msg) => {
      if(err) throw err;
      User.find({}, (err, users) => {
        if(err) throw err;
        users.forEach((user) => {
          client.messages.create({
            body: req.body.generalMsg,
            to: '+1'+user.telephone,
            from: process.env.TWILIO_NUMBER
          }, function(err, message) {
            if(err) console.log(err.message);
            console.log(message.sid);
          });
        });
        res.json({
          data: req.body.text
        });
      });
    });
  });
};
