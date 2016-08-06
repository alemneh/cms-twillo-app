'use strict'
module.exports = (app) => {
  app.controller('SmsController', ['$http', '$location', '$window',
    function($http, $location, $window) {
      let _this = this;
      var token;
      let url = 'https://gondar-sms.herokuapp.com';
      // let url = 'http://localhost:3000';
      let link = 'https://gonder-hibret.github.io';
      token = $window.localStorage.token;


      _this.sendMessage = function(message) {
        message.text = 'GONDER HIBRET: ' + message.text + '\n\n-Gonder Hibret Committee';
        console.log(message);
        $http.post(url +'/sms', message, {
          headers: {
            token: token
          }
        }).then((res) => {
          console.log(res);
          $location.path('/home');
        }, (err) => console.log(err))
      }

      _this.sendLongMessage = function(message) {
        message.date = new Date();
        message.generalMsg = 'GONDER HIBRET: Here is the link to the new general message '+ link +'\n\n-Gonder Hibret Committee';
        console.log(message);
        $http.put(url +'/sms/message', message, {
          headers: {
            token: token
          }
        }).then((res) => {
          console.log(res);
          $location.path('/home');
        }, (err) => console.log(err))
      }

  }]);
}
