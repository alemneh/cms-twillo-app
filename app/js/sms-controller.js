'use strict'
module.exports = (app) => {
  app.controller('SmsController', ['$http', '$location',
    function($http, $location) {
      let _this = this;

      _this.sendMessage = function(message) {
        $http.post('http://localhost:3000/sms', message).then((res) => {
          console.log(res);
          $location.path('/home');
        }, (err) => console.log(err))
      }

  }]);
}
