console.log("content file is running");




let amazone = angular.module("amazonextension", ['ui.router']);
amazone.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/home.html',
          controller: 'MainCtrl'
        })
        .state('login', {
          url: '/login',
          templateUrl: '/login.html',
          controller: 'LoginController'
        })
        .state('signup', {
          url: '/signup',
          templateUrl: '/signUp.html',
          controller: 'SignupController'
        });
    
      $urlRouterProvider.otherwise('/login');
    }]);

    var userEmail;
    var userPassword;
    var user={
      userEmail,
      userPassword
    }

    var NewUserName;
    var NewUserEmail;
    var NewUserPassword;
    var NewUser={
      NewUserName,
      NewUserEmail,
      NewUserPassword

    }

    amazone.controller('SignupController',['$scope',function($scope){
      

      $scope.NewUserData=function(name,pass,email){
      NewUser.NewUserName=name,
      NewUser.NewUserEmail=email,
      NewUser.NewUserPassword=pass
       
        console.log(NewUser);

        
        chrome.runtime.sendMessage({NewUser:NewUser},function(response){
          console.log(response.msg);
        })

      };
    }])

    amazone.controller('LoginController',['$scope',function($scope){
      

      $scope.userData=function(email,pass){
        user.userEmail=email;
        user.userPassword=pass;
       
        console.log(user);

        chrome.runtime.sendMessage({user:user},function(response){
          console.log(response.msg);
        })

      };
    }])