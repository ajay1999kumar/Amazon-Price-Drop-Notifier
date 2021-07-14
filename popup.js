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
        });;
    
      $urlRouterProvider.otherwise('/login');
    }]);

    var userName;
    var userPassword;
    var user={
      userName,
      userPassword
    }

    amazone.controller('LoginController',['$scope',function($scope){
      

      $scope.userData=function(name,pass){
        user.userName=name;
        user.userPassword=pass;
       
        console.log(user);

      };
    }])