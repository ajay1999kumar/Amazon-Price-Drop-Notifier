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
        });
    
      $urlRouterProvider.otherwise('/');
    }]);