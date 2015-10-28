'use strict';

angular.module('nibble.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/login/login.html',
    controller: 'loginCtrl'
  });
}])
.controller('loginCtrl', ["$rootScope","$http","$location",function(root,http,location) {
  $("#reg-form").submit(function(e){
    e.preventDefault();
    http({
      method: "POST",
      data: {rfid: root.rfid}
    }).then(function(ret){
      /*Success*/
      if(ret.data){
        root.user = ret.data;
      }else{
        
      }
    },function(error){
      /*Fail*/
      
    });
    /*Registration code:*/
  });
  $("#rfid-form").submit(function(e){
    /*Validation and 'login' code:*/
    e.preventDefault();
    root.rfid = $("#rfid-input").value;
    console.log(root.rfid);
    root.validation_fail = false;
    //Check if a user is assosiated with the rfid
    //$http request:
    http({
      url: "login/",
      method: "post",
      data: {rfid: root.rfid}
    }).then(function(ret){
        /*Success*/
        if(ret.data){
          root.user = ret.data; //<-- if data is json??
          location.url("/shop");
        }
        else{
          root.rfid = null;
          root.validation_fail = true;
          Materialize.toast("Validation failed!", 2000);
          Materialize.toast("Fill inn username and password", 2000);
        }
      },
      function(error){
        /*Fail*/
        /*Only called when an error respons occurs*/
        root.rfid = null;
        root.user = null;
        root.validation_fail = false;
        console.log(error);
        Materialize.toast("Something wrong happened :O", 4000);
        Materialize.toast("Server returned error code: " + error.status, 4000);
        /*Display error in card?*/
      
        /*Temp test code: */
        root.user = {name: "testUser",balance: 200};
        location.url("/shop");
      }

    );
  });
}]);