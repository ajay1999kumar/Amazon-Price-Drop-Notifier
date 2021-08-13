console.log("content file is running");


var username;
var email;
var password;

var NewUser={
   username,
   email,
   password

}


var user={
 email,
 password
}

let amazone = angular.module("amazonextension", ['ui.router']);
amazone.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '../html/home.html',
          controller: 'MainCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: '../html/login.html',
          controller: 'LoginController'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: '../html/signUp.html',
          controller: 'SignupController'
        });
    
      $urlRouterProvider.otherwise('/login');
    }]);

    


    amazone.controller('SignupController',['$scope',function($scope){
      

      $scope.NewUserData=function(name,pass,email){
      NewUser.username=name,
      NewUser.email=email,
      NewUser.password=pass
       
        console.log(NewUser);

        
        chrome.runtime.sendMessage({NewUser:NewUser},function(response){
          console.log(response.msg);
        })

      };
    }])

    amazone.controller('LoginController',['$scope',function($scope){
      

      $scope.userData=function(email,pass){
        user.email=email;
        user.password=pass;
       
        console.log(user);
        
        chrome.runtime.sendMessage({user:user},function(response){
          console.log(response.msg);
        })
        
      };
    }])