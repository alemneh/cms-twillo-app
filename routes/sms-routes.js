'use strict';
var accountSid = process.env.ACCOUNT_SID;
var auth_token = process.env.AUTH_TOKEN;
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, auth_token);

module.exports = (smsRouter, models) => {
  let User = models.User;
  smsRouter.post('/sms', (req, res) => {
    User.find({}, (err, users) => {
      if(err) throw err;
      users.forEach((user) => {
        client.messages.create({
          body: req.body.text,
          to: '+1'+user.telephone,
          from: '+12064298558'
        }, function(err, message) {
          if(err) console.log(err.message);
          console.log(message.sid);
        });
      })
      res.json({
        data: req.body.text
      });
    })
    console.log(req.body.text);

  })
}
