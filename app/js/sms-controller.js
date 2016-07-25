'use strict'
module.exports = (app) => {
  app.controller('SmsController', ['$http', '$location',
    function($http, $location) {
      let _this = this;
      let url = 'https://gondar-sms.herokuapp.com';
      // let url = 'http://localhost:3000';

      _this.sendMessage = function(message) {
        $http.post(url +'/sms', message).then((res) => {
          console.log(res);
          $location.path('/home');
        }, (err) => console.log(err))
      }

  }]);
}
