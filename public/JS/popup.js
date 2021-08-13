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
          url: '/home',
          templateUrl: '../html/home.html',
          controller: 'MainController'
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

    
    amazone.controller('MainController',['$scope','$state',function($scope,$state){
      

      
    }])


    amazone.controller('SignupController',['$scope','$state',function($scope,$state){
      

      $scope.NewUserData=function(name,pass,email){
      NewUser.username=name,
      NewUser.email=email,
      NewUser.password=pass
       
        console.log(NewUser);

        
        chrome.runtime.sendMessage({NewUser:NewUser},function(response){
          console.log(response.msg);
          if(response.newUser!=null)
          {
            $state.go("login");
          }
        })

      };
    }])

    amazone.controller('LoginController',['$scope','$state',function($scope,$state){
      

      $scope.userData=function(email,pass){
        user.email=email;
        user.password=pass;
       
        console.log(user);
        
        chrome.runtime.sendMessage({user:user},function(response){
          console.log(response.msg);
          if(response.user!=null)
          {
            $state.go("home");
          }
        })
        
      };
    }])