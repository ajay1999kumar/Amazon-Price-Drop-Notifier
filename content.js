//console.log("content file is running")
let amazonextension = angular.module("amazonextension", ['ui.router']);
amazonextension.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
    
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainCtrl'
        });
    
      $urlRouterProvider.otherwise('home');
    }]);